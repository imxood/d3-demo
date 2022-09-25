<script type="ts">
    import * as d3 from "d3";
    import { onDestroy, onMount } from "svelte";
    import item from "./data/seattle_wa_weather_data.json";

    let wrap_ele: HTMLElement;

    const dataset = item;

    interface Dimension {
        margin: {
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
        width: number;
        height: number;
        ticks: number;
    }

    onDestroy(() => {
        console.log("onDestroy Chart03");
    });

    onMount(() => {
        console.log("onMount Chart03");
        redraw();
    });

    function redraw() {
        const width = 600;

        let dimension: Dimension = {
            margin: {
                top: 20,
                right: 10,
                bottom: 45,
                left: 45,
            },
            width: width,
            height: width * 0.6,
            ticks: 20,
        };

        // 清空已有的元素
        wrap_ele.innerHTML = "";

        if (dataset) {
            // let data = dataset[0];
            // for (var metric in data) {
            //     if (typeof data[metric] == "number") {
            //         makeHistogram(wrap_ele, dataset, dimension, metric, false);
            //     }
            // }
            const metrics = [
                "moonPhase",
                "dewPoint",
                "humidity",
                "pressure",
                "windSpeed",
                "windGust",
                "cloudCover",
                "visibility",
                "temperatureMin",
                "temperatureMax",
            ];
            metrics.forEach((metric) => {
                makeHistogram(wrap_ele, dataset, dimension, metric, false);
            });
        }
    }

    // 构建直方图
    function makeHistogram(
        wrap_ele: HTMLElement,
        dataset: any[],
        dimension: Dimension,
        metric: string,
        show_y_axis: boolean
    ) {
        let wrapper = d3
            .select(wrap_ele)
            .attr("role", "figure")
            .attr("tabindex", 0);

        const barPadding = 1;

        const svg = wrapper
            .append("svg")
            .attr("width", dimension.width)
            .attr("height", dimension.height);

        const bound = svg
            .append("g")
            .style(
                "transform",
                `translate(${dimension.margin.left}px, ${dimension.margin.top}px)`
            );

        const bound_width =
            dimension.width - dimension.margin.left - dimension.margin.right;

        const bound_height =
            dimension.height - dimension.margin.top - dimension.margin.bottom;

        const metricAccessor = (d) => d[metric];

        const xScale = d3
            .scaleLinear()
            .domain(d3.extent(dataset, metricAccessor))
            .range([0, bound_width])
            .nice();

        const binsGenerator = d3
            .bin<any, number>()
            .domain(d3.extent(dataset, metricAccessor))
            .value(metricAccessor)
            .thresholds(dimension.ticks);

        const bins = binsGenerator(dataset);

        const yAccessor = (d) => d.length;
        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(bins, yAccessor)])
            .range([bound_height, 0])
            .nice();

        const binGroup = bound
            .append("g")
            .attr("role", "list")
            .attr("tabindex", 0);

        const binGroups = binGroup
            .selectAll("g")
            .data(bins)
            .enter()
            .append("g")
            .attr("role", "listitem")
            .attr("tabindex", 0);

        // 直方图矩形 + label
        binGroups
            .append("rect")
            .attr("x", (d) => xScale(d.x0) + barPadding / 2)
            .attr("y", (d) => yScale(yAccessor(d)))
            .attr("width", (d) => xScale(d.x1) - xScale(d.x0) - barPadding)
            .attr("height", (d) => bound_height - yScale(yAccessor(d)))
            .attr("fill", "cornflowerblue");

        binGroups
            .filter(yAccessor)
            .append("text")
            .attr("x", (d) => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
            .attr("y", (d) => yScale(yAccessor(d)) - 5)
            .attr("fill", "black")
            .attr("text-anchor", "middle")
            .text(yAccessor);

        // mean
        const mean = d3.mean(dataset, metricAccessor);
        bound
            .append("line")
            .attr("x1", xScale(mean))
            .attr("y1", 5)
            .attr("x2", xScale(mean))
            .attr("y2", bound_height)
            .attr("stroke", "red")
            .attr("stroke-dasharray", "2px 4px");
        bound
            .append("text")
            .attr("x", xScale(mean))
            .attr("y", 0)
            .text("mean")
            .attr("fill", "red")
            .style("font-size", "1em")
            .style("text-anchor", "middle");

        // y轴
        if (show_y_axis) {
            bound
                .append("g")
                .call(d3.axisLeft(yScale))
                .append("text")
                .attr("x", -bound_height / 2)
                .attr("y", -dimension.margin.left + 20)
                .attr("fill", "black")
                .attr("font-size", "1.4em")
                .style("transform", "rotate(-90deg)")
                .style("text-anchor", "middle")
                .text("次数");
        }

        // x轴
        bound
            .append("g")
            .call(d3.axisBottom(xScale).ticks(dimension.ticks))
            .style("transform", `translateY(${bound_height}px)`)
            .append("text")
            .attr("x", bound_width / 2)
            .attr("y", dimension.margin.bottom - 10)
            .attr("fill", "black")
            .attr("font-size", "1.4em")
            .text(metric);
    }
</script>

<div
    class="flex-1 bg-white overflow-y-scroll flex flex-wrap"
    bind:this={wrap_ele}
/>

<svelte:window on:resize={redraw} />

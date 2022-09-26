<script type="ts">
    import * as d3 from "d3";
    import { onDestroy, onMount } from "svelte";
    import item from "./data/seattle_wa_weather_data.json";

    let div_ele: HTMLElement;

    let dataset: any[] = item.slice(0, 100);

    const dateParser = d3.timeParse("%Y-%m-%d");

    const yAccessor = (d) => (d.temperatureMax - 32) / 1.8;
    const xAccessor = (d) => dateParser(d.date);

    let dimensions = {
        margin: {
            top: 10,
            right: 10,
            bottom: 30,
            left: 30,
        },
    };

    let timeout;

    onMount(() => {
        console.log("onMount Chart04_1");
        redraw();
    });

    onDestroy(() => {
        clearInterval(timeout);
        console.log("onDestroy Chart04_1");
    });

    function redraw() {
        if (timeout) {
            clearInterval(timeout);
        }
        console.log("redraw Chart04_1");

        let wrapper = d3.select(div_ele);
        console.log("onMount Chart01");

        wrapper.html(null);

        const svg = wrapper
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%");

        let rect = svg.node().getBoundingClientRect();

        const bound = svg
            .append("g")
            .style(
                "transform",
                `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
            );

        let width =
            rect.width - dimensions.margin.left - dimensions.margin.right;
        let height =
            rect.height - dimensions.margin.top - dimensions.margin.bottom;

        const xAxis = bound
            .append("g")
            .attr("class", "x-axis")
            .style("transform", `translateY(${height}px)`);
        const yAxis = bound.append("g").attr("class", "y-axis");

        const lines = bound.append("path");

        function drawLines() {
            const xScale = d3
                .scaleTime()
                .domain(d3.extent(dataset, xAccessor))
                .range([0, width])
                .nice();

            const yScale = d3
                .scaleLinear()
                .domain(d3.extent(dataset, yAccessor))
                .range([height, 0])
                .nice();

            const updateTransition = d3.transition().duration(600);

            const linesGenerator = d3
                .line<any>()
                .x((d) => xScale(xAccessor(d)))
                .y((d) => yScale(yAccessor(d)));

            lines
                .attr("d", linesGenerator(dataset))
                .attr("fill", "none")
                .attr("stroke", "red")
                .attr("stroke-width", 2);

            xAxis.call(d3.axisBottom(xScale));
            yAxis.call(d3.axisLeft(yScale));
        }

        timeout = setInterval(() => {
            dataset = generateNewDataPoint();
            drawLines();
        }, 200);

        // bound
        //     .append("g")
        //     .call(d3.axisLeft(yScale))
        //     .append("g")
        //     .call(d3.axisBottom(xScale));

        // console.log("dataset", dataset);
        // lines.transition().duration(3000).attr("d", lineGenerator(dataset));
    }

    function generateNewDataPoint() {
        const lastDataPoint = dataset[dataset.length - 1];
        const nextDay = d3.timeDay.offset(xAccessor(lastDataPoint), 1);

        let data = [
            ...dataset.slice(1),
            {
                date: d3.timeFormat("%Y-%m-%d")(nextDay),
                temperatureMax:
                    yAccessor(lastDataPoint) + (Math.random() * 6 - 3),
            },
        ];

        return data;
    }
</script>

<div class="flex-1 bg-#E5E8F4" bind:this={div_ele} />

<svelte:window on:resize={redraw} />

<script type="ts">
    import * as d3 from "d3";
    import { onDestroy, onMount } from "svelte";
    import item from "./data/seattle_wa_weather_data.json";

    let div_ele: HTMLElement;

    const dataset = item;

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

    onDestroy(() => {
        console.log("onDestroy Chart01");
    });

    onMount(() => {
        let wrapper = d3.select(div_ele);
        console.log("onMount Chart01");

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

        const yScale = d3
            .scaleLinear()
            .domain(d3.extent(dataset, yAccessor))
            .range([height, 0])
            .nice();

        const xScale = d3
            .scaleTime()
            .domain(d3.extent(dataset, xAccessor))
            .range([0, width])
            .nice();

        const lineGenerator = d3
            .line<any>()
            .x((d) => xScale(xAccessor(d)))
            .y((d) => yScale(yAccessor(d)));

        bound
            .append("path")
            .attr("d", lineGenerator(dataset))
            .attr("fill", "none")
            .attr("stroke", "red")
            .attr("stroke-width", 2);

        bound
            .append("g")
            .call(d3.axisLeft(yScale))
            .append("g")
            .call(d3.axisBottom(xScale))
            .style("transform", `translateY(${height}px)`);
    });
</script>

<div class="flex-1 bg-#D8C076" bind:this={div_ele} />

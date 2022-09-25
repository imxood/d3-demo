<script type="ts">
    import * as d3 from "d3";
    import { onMount, onDestroy } from "svelte";
    import item from "./data/seattle_wa_weather_data.json";

    let div_ele: HTMLElement;

    const dataset = item;

    const dateParser = d3.timeParse("%Y-%m-%d");

    const yAccessor = (d) => d.humidity;
    const xAccessor = (d) => d.dewPoint;
    const colorAccessor = (d) => d.cloudCover;

    let dimensions = {
        margin: {
            top: 10,
            right: 10,
            bottom: 40,
            left: 60,
        },
        bound_width: 0,
        bound_height: 0,
    };

    onDestroy(()=> {
        console.log("onDestroy Chart02");
    });

    onMount(() => {
        let wrapper = d3.select(div_ele);
        console.log("onMount Chart02");

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

        dimensions.bound_width =
            rect.width - dimensions.margin.left - dimensions.margin.right;

        dimensions.bound_height =
            rect.height - dimensions.margin.top - dimensions.margin.bottom;

        const yScale = d3
            .scaleLinear()
            .domain(d3.extent(dataset, yAccessor))
            .range([dimensions.bound_height, 0])
            .nice();

        const xScale = d3
            .scaleLinear()
            .domain(d3.extent(dataset, xAccessor))
            .range([0, dimensions.bound_width])
            .nice();

        const colorScale = d3
            .scaleLinear<string>()
            .domain(d3.extent(dataset, colorAccessor))
            .range(["red", "blue"]);

        bound
            .append("g")
            .selectAll("circle")
            .data(dataset)
            .join("circle")
            .attr("cx", (d) => xScale(xAccessor(d)))
            .attr("cy", (d) => yScale(yAccessor(d)))
            .attr("r", 3)
            .attr("fill", (d) => colorScale(colorAccessor(d)));

        bound
            .append("g")
            .call(d3.axisLeft(yScale))
            .append("text")
            .attr("x", -dimensions.bound_height / 2)
            .attr("y", -dimensions.margin.left + 20)
            .attr("fill", "black")
            .attr("font-size", "1.4em")
            .style("transform", "rotate(-90deg)")
            .style("font-anchor", "middle")
            .text("湿度");

        bound
            .append("g")
            .call(d3.axisBottom(xScale))
            .style("transform", `translateY(${dimensions.bound_height}px)`)
            .append("text")
            .attr("x", dimensions.bound_width / 2)
            .attr("y", dimensions.margin.bottom - 10)
            .attr("fill", "black")
            .attr("font-size", "1.4em")
            .text("露点");
    });
</script>

<div class="flex-1 bg-#ACE4FC" bind:this={div_ele} />

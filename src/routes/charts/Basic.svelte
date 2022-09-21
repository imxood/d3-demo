<script lang="ts">
    import * as d3 from "d3";
    import { schemeGnBu } from "d3";
    import { onMount, SvelteComponent } from "svelte";
    import * as weather_data from "./data/seattle_wa_weather_data.json";
    let div_ele: HTMLElement;

    let data = [];
    for (let i = 0; i < 100; ++i) {
        data.push({ x: Math.random() * 10, y: Math.random() * 10 });
    }

    let margin = { top: 60, bottom: 60, left: 60, right: 60 };

    let width: number;
    let height: number;

    let xScale = d3.scaleLinear().domain([0, 10]);
    let yScale = d3.scaleLinear().domain([0, 10]);

    onMount(() => {
        console.log("onMount");
        redraw();
        window.addEventListener("resize", redraw);
    });

    function redraw() {
        d3.select(div_ele).html(null);
        let node = d3.select(div_ele).node();
        // .getBoundingClientRect();
        width = node.clientWidth - margin.left - margin.right;
        height = node.clientHeight - margin.top - margin.bottom;

        xScale.range([0, width]);
        yScale.range([0, height]);

        // console.log(rect);

        const svg = d3
            .select(div_ele)
            .append("svg")
            .attr("width", node.clientWidth)
            .attr("height", node.clientHeight);
        // .append("g")
        // .attr("transform", `translate(${[margin.left, margin.top]})`);

        // // 画 x轴
        // svg.append("g")
        //     .attr("transform", `translate(${[0, height]})`)
        //     .call(d3.axisBottom(xScale));

        // // 画 y轴
        // svg.append("g").call(d3.axisLeft(yScale));

        // svg.append("g")
        //     .selectAll("circle")
        //     .data(data)
        //     .enter()
        //     .append("circle")
        //     .attr("cx", (d) => {
        //         return xScale(d.x);
        //     })
        //     .attr("cy", (d) => {
        //         return yScale(d.y);
        //     })
        //     .attr("r", 7)
        //     .style("fill", "#ff3e00")
        //     .style("fill-opacity", "0.5")
        //     .attr("stroke", "#ff3e00");
    }
</script>

<div id="svg" class="flex-1 bg-amber" bind:this={div_ele} />

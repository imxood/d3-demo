<script lang="ts">
    import * as d3 from "d3";
    import { onMount } from "svelte";
    let div_ele: HTMLElement;

    let data = [];
    for (let i = 0; i < 100; ++i) {
        data.push({ x: Math.random() * 10, y: Math.random() * 10 });
    }

    let margin = { top: 60, bottom: 60, left: 60, right: 60 };

    onMount(() => {
        console.log("onMount");
        redraw();
        window.addEventListener("resize", redraw);
    });

    function redraw() {
        var wrapper = d3.select(div_ele);

        wrapper.html(null);
        // console.log(rect);

        let rect = div_ele.getBoundingClientRect();
        let width = rect.width - margin.left - margin.right;
        let height = rect.height - margin.top - margin.bottom;

        console.log(rect.width, rect.height);

        const bounds = wrapper
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .append("g")
            .attr("transform", `translate(${[margin.left, margin.top]})`);

        console.log(bounds.node());

        let xScale = d3.scaleLinear().domain([0, 10]).range([0, width]);
        let yScale = d3.scaleLinear().domain([0, 10]).range([0, height]);

        // 画 x轴
        bounds
            .append("g")
            .attr("transform", `translate(${[0, height]})`)
            .call(d3.axisBottom(xScale));

        // 画 y轴
        bounds.append("g").call(d3.axisLeft(yScale));

        bounds
            .append("g")
            .selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", (d) => {
                return xScale(d.x);
            })
            .attr("cy", (d) => {
                return yScale(d.y);
            })
            .attr("r", 7)
            .style("fill", "#ff3e00")
            .style("fill-opacity", "0.5")
            .attr("stroke", "#ff3e00");
    }
</script>

<div id="svg" class="flex-1 bg-amber" bind:this={div_ele} />

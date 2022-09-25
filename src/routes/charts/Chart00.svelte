<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { afterNavigate, beforeNavigate } from "$app/navigation";
    import * as d3 from "d3";
    let wrap_ele: HTMLElement;

    let data = [];
    for (let i = 0; i < 100; ++i) {
        data.push({ x: Math.random() * 10, y: Math.random() * 10 });
    }

    let margin = { top: 60, bottom: 60, left: 60, right: 60 };

    onMount(() => {
        console.log("onMount Chart00");
        redraw();
    });

    onDestroy(() => {
        console.log("onDestroy Chart00");
    });

    function redraw() {
        var wrapper = d3.select(wrap_ele);

        wrapper.html(null);

        let rect = wrap_ele.getBoundingClientRect();
        let width = rect.width - margin.left - margin.right;
        let height = rect.height - margin.top - margin.bottom;

        const bounds = wrapper
            .append("svg")
            .attr("width", "100%")
            .attr("height", "100%")
            .append("g")
            .attr("transform", `translate(${[margin.left, margin.top]})`);

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

<div id="svg" class="flex-1 bg-#1BBFF2" bind:this={wrap_ele} />

<svelte:window on:resize={redraw} />

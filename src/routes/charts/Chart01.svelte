<script type="ts">
    import { afterNavigate, beforeNavigate } from "$app/navigation";
    import * as d3 from "d3";
    import { onMount } from "svelte";
    import * as weather_data from "./data/seattle_wa_weather_data.json";

    let div_ele: HTMLElement;

    const dateParser = d3.timeParse("%Y-%m-%d");

    const yAccessor = (d) => d.temperatureMax;
    const xAccessor = (d) => dateParser(d.date);

    const yScale = d3
        .scaleLinear()
        .domain(d3.extent(weather_data, yAccessor))
        .range([]);

    beforeNavigate((nav) => {
        console.log("before nav Chart01", nav);
    });

    afterNavigate((nav) => {
        console.log("after nav Chart01", nav);
    });

    onMount(() => {
        let wrapper = d3.select(div_ele);
        console.log(weather_data);
        console.log("onMount Chart01");
    });
</script>

<div class="flex-1 bg-emerald" bind:this={div_ele} />

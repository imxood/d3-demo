<script type="ts">
    import * as d3 from "d3";
    import { onMount } from "svelte/types/runtime/internal/lifecycle";
    import * as weather_data from "./data/seattle_wa_weather_data.json";

    let div_ele: HTMLElement;

    const dateParser = d3.timeParse("%Y-%m-%d");

    const yAccessor = (d) => d.temperatureMax;
    const xAccessor = (d) => dateParser(d.date);

    onMount(() => {
        let wrapper = d3.select(div_ele);

        console.log(weather_data);
        weather_data;
    });
</script>

<div class="flex-1 bg-emerald" bind:this={div_ele} />

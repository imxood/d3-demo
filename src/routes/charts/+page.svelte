<script type="ts">
    import Charts from "./components";
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { afterNavigate, beforeNavigate } from "$app/navigation";

    // import type { PageData } from "./$types";
    // export let data: PageData;

    console.log($page.url.searchParams);

    let Chart;

    onMount(() => {
        console.log("onMount charts");
    });
    console.log("Chart", Chart);

    beforeNavigate((nav) => {
        console.log("before nav charts", nav);
    });

    afterNavigate((nav) => {
        console.log("after nav charts", nav);

        let chart = $page.url.searchParams.get("chart");
        console.log("chart", chart);

        let name =
            chart?.substring(0, 1).toUpperCase() +
                chart?.substring(1).toLowerCase() ?? "";
        Chart = Charts.find((comp) => comp.name == name)?.component;
        console.log("Chart", Chart);
    });
</script>

<div class="h-6 w-100% flex">
    <div class="pr-5">
        {#each Charts as chart}
            <a href="/charts?chart={chart.name}">{chart.name}</a>
        {/each}
    </div>
</div>

<svelte:component this={Chart}>
    <slot />
</svelte:component>

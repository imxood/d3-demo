<script type="ts">
    import { charts } from "./components";
    import { page } from "$app/stores";

    console.log($page.url.searchParams);

    let chart = charts[0];

    function switch_chart(chart_name) {
        chart = charts.find((c) => c.name == chart_name);
    }
</script>

<div class="h-6 w-100% flex">
    <div class="pr-5">
        {#each charts as c}
            <button
                on:click={() => {
                    switch_chart(c.name);
                }}
                >{c.name}
            </button>
        {/each}
    </div>
</div>

<svelte:component this={chart.component} />

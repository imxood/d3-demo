<script type="ts">
    import * as d3 from "d3";
    import { onMount } from "svelte";

    var matrix = [
        [11975, 5871, 8916, 2868],
        [1951, 10048, 2060, 6171],
        [8010, 16145, 8090, 8045],
        [1013, 990, 940, 6907],
    ];

    let wrap_ele: HTMLElement;

    onMount(() => {
        var tr = d3
            .select(wrap_ele)
            .append("table")
            .selectAll("tr")
            .data(matrix)
            .enter()
            .append("tr");

        console.log("tr", tr);


        var td = tr
            .selectAll("td")
            .data(function (d) {
                return d;
            })
            .enter()
            .append("td")
            .text(function (d) {
                return d;
            });
    });
</script>

<div bind:this={wrap_ele} />

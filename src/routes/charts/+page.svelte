<script type="ts">
    import { page } from "$app/stores";
    import Basic from "./Basic.svelte";
    import type { PageData } from "./$types";
    export let data: PageData;
    console.log(data);
</script>

<div class="h-6 w-100% flex">
    <span class:active={$page.url.pathname === "/"}>
        <a href="/charts/chart01">Home</a>
    </span>
</div>

<!-- <div class="h-6 w-100% flex submenu">
    {#each data.sections as section}
        <a href="/settings/{section.slug}">{section.title}</a>
    {/each}
</div> -->

<!-- <slot /> -->

<!-- <Basic /> -->

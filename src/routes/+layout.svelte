<script lang="ts">
	import Header from "$lib/header/Header.svelte";
	import "../app.css";
	import "uno.css";
</script>

<Header />

<main class="flex-1 flex flex-col overflow-hidden">
	<slot />
</main>

<footer class="flex flex-col justify-center items-center font-bold">
	<div>马许 制作</div>
</footer>

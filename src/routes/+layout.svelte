<script lang="ts">
	import Header from "$lib/header/Header.svelte";
	import "../app.css";
	import "uno.css";
</script>

<Header />

<main class="flex-1 flex flex-col">
	<slot />
</main>

<footer>
	<p>
		visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit
	</p>
</footer>

<style>
	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>

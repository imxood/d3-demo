<script lang="ts">
	import { page } from "$app/stores";
	import logo from "./svelte-logo.svg";
</script>

<header data-sveltekit-prefetch class="flex justify-center items-center">
	<ul>
		<li class:active={$page.url.pathname === "/"}>
			<a href="/">Home</a>
		</li>
		<li class:active={$page.url.pathname === "/charts"}>
			<a href="/charts">Charts</a>
		</li>
		<li class:active={$page.url.pathname === "/about"}>
			<a href="/test">Test</a>
		</li>
		<li class:active={$page.url.pathname === "/about"}>
			<a href="/about">About</a>
		</li>
	</ul>
</header>

<style>
	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li.active::before {
		--size: 6px;
		content: "";
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--accent-color);
	}

	header a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--heading-color);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--accent-color);
	}
</style>

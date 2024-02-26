<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let cls;
	// context is not reactive, so it's common to use stores together with context to get reactivity.
	const tabs = writable([]);

	// track which tab is active
	let activeIndex = 0;

	// create a context called "tabs" to share the store with children
	setContext('tabs', { tabs });

	// update the tabs store whenever the active index changes
	// it will cause children to update since they are subscribed to the store
	$: $tabs = $tabs.map((tab, i) => {
		return {
			...tab,
			active: activeIndex === i
		};
	});
</script>

<nav class="flex flex-wrap gap-1 {cls}">
	{#each $tabs as tab, i}
		<button
			class="p-2 border-2 border-x-2 border-t-2  flex-1  flex items-center"
			class:border-black={tab.active}
			class:disabled={$tabs.length === 1}
			aria-disabled={$tabs.length === 1}
			class:sel-btn={tab.active || $tabs.length === 1}
			class:opacity-70={!tab.active}
			on:click={() => {
				activeIndex = i;
			}}
			style:background={tab.color}
		>
			<div class="m-auto flex items-center">
				{tab.title}
			</div>
		</button>
	{/each}
</nav>

<slot />

<style>
	.dir {
		@apply flex-col justify-start;
	}
	/* @screen sm {
		.dir {
			@apply flex-row justify-center;
		}
	} */
</style>

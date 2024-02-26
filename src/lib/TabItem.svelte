<script>
	import { slide } from 'svelte/transition';
	import { getContext, onDestroy, onMount, afterUpdate } from 'svelte';

	// get the tabs store from the context
	const { tabs } = getContext('tabs');

	export let title;
	let index;

	// pull out current tab, updates whenever store changes
	// ie, if tab.active changes, it will cause this to update

	onMount(() => {
		// compute index
		index = $tabs.length;

		// add a record to the tabs store
		$tabs = [...$tabs, { title }];
	});

	afterUpdate(() => {
		$tabs = $tabs.map((t) => {
			if (t.title === title) {
				return { ...t, title };
			}

			return { ...t };
		});
	});

	$: tab = $tabs[index];
</script>

{#if tab && tab.active}
	<div class="flex flex-col flex-grow overflow-y-auto">
		<slot />
	</div>
{/if}

<style>
	.fl {
		@apply flex-none;
	}
	.width {
		width: 100%;
	}
	.height {
		/* height: 400px; */
	}
	/* @screen sm {
		.fl {
			@apply flex-1;
		}
		.width {
			width: 450px;
		}
		.max-height {
			height: 100%;
		}
	} */
</style>

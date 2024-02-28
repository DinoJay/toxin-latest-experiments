<script>
	import ArrowRightDropCircleOutline from 'svelte-material-icons/ArrowRightDropCircleOutline.svelte';
	import { slide } from 'svelte/transition';

	export let title = '';
	/**
	 * @type {null|string}
	 */
	export let height = null;

	export let style = '';
	export let cls;
	let expanded = false;

	let el;
	$: {
		if (expanded) {
			setTimeout(() => {
				el?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'end' });
			}, 600);
		}
	}

	// onDestroy(() => {
	// 	clearTimeout(id);
	// });
</script>

<!-- Main block -->
<div
	class="{expanded ? 'expanded ' : ''} p-2 flex flex-col border-2  {cls}"
	{style}
	style:height={height !== null && expanded ? height : undefined}
	bind:this={el}
>
	<div
		on:keydown={() => null}
		class="flex {expanded
			? 'mb-3'
			: ''}  w-full flex items-center flex-none justify-center cursor-pointer"
		on:click={() => {
			expanded = !expanded;
		}}
	>
		<span class=" mr-2 transition-all {expanded ? 'rotate' : ''}">
			<ArrowRightDropCircleOutline size={24} />
		</span>
		<h1 class=" text-xl font-medium crop">
			{title}
		</h1>
		<div class="ml-auto">
			<slot name="header" />
		</div>
	</div>

	<div class="flex-grow flex flex-col overflow-y-auto">
		{#key expanded}
			{#if expanded}
				<!-- {#if anim} -->
				<div class="flex flex-col flex-grow overflow-y-auto" transition:slide>
					<slot />
				</div>
				<!-- {:else} -->
				<!-- <slot /> -->
				<!-- {/if} -->
			{/if}
		{/key}
	</div>
</div>

<style>
	.panel-container {
		transition: all 0.3s ease;
	}

	.expanded {
		max-height: 40rem;
	}

	.rotate {
		transform: rotate(90deg);
	}

	.custom-shadow {
		box-shadow: 5px 5px 5px #a6a29f;
	}
</style>

<script>
	export let categories;
	export let key;
	export let defaultKeys;
	export let defaultValues;

	import { fade, fly, slide } from 'svelte/transition';
	import KlimischScoreReview from './KlimischScoreReview.svelte';
	import StringElement from './stringElement.svelte';
	import transformText from './transformText';

	import sortCats from './sortCats';
	import removeKey from './removeKey';

	const cats = Object.entries(categories).map(([key, values]) => ({ key, values }));
	// console.log('cats', cats);
	let open = false;
</script>

<div transition:fly class=" ">
	<div
		class="bg-gainsboro my-2 p-3"
		role="button"
		on:click={() => (open = !open)}
		on:keydown={() => (open = !open)}
	>
		{transformText(key)}<KlimischScoreReview {...categories} {key} />
	</div>
	{#if open}
		<div class="ml-8">
			{#each sortCats(cats) as c}
				{#if typeof c.values === 'object'}
					<svelte:self categories={c.values} key={c.key} {defaultKeys} />
				{:else}
					<StringElement {defaultKeys} {defaultValues} key={c.key} value={c.values} />
				{/if}
			{/each}
		</div>
	{/if}
</div>

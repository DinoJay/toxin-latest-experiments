<script>
	import { allDefaultValues } from './../defaultValues.js';
	import AttrElement from './attrElement.svelte';
	import StringElement from './stringElement.svelte';
	import { fade, slide } from 'svelte/transition';
	// import { v4 as uuidv4 } from 'uuid';
	import sortCats from './sortCats';
	import removeKey from './removeKey.js';

	export let categories;
	export let open;
	export let defaultKeys;
	export let defaultValues;
	// console.log('categories', guidelineAttrs('non OECD', categories));
	// const cs = getAttrs('cats', categories);

	// console.log('categories', categories);

	//TODDO : why does it not work with in the default values
	const cats = Object.entries(removeKey(removeKey(categories, 'defaultKeys'), 'defaultValues'))
		.map(([key, values]) => ({
			key,
			values
		}))
		.sort((a, b) => {
			if (defaultKeys !== undefined) {
				if (typeof a.values === 'object' || typeof b.values === 'object') {
					return -1;
				}
				if (defaultKeys.includes(a.key)) {
					return -1;
				}
				return 1;
			}
			return 1;
		});

	console.log('cats', cats);

	// console.log('cats', cats);
	// console.log('key', key);
	// let open = false;
</script>

{#if open}
	<div class="ml-12">
		{#each sortCats(cats) as c}
			{#if typeof c.values === 'object'}
				<AttrElement
					{defaultValues}
					key={c.key}
					categories={removeKey(c.values, 'klimisch_score')}
					{defaultKeys}
				/>
			{:else if c.key.startsWith('_') === false}
				<StringElement {defaultKeys} {defaultValues} key={c.key} value={c.values} {categories} />
			{/if}
		{/each}
	</div>
{/if}

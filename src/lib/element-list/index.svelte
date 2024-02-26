<script>
	import VerticalList from './verticalList.svelte';

	export let secLabel;
	export let grData;

	//= groupData(data, groupBy);
	$: offset = 10;
	$: numPages = Math.ceil(grData.length / offset);
	$: curPage = 0;
	$: numPagesArray = Array.from(Array(numPages));
	// $: {
	// 	grData = grData.sort((a, b) => b.values.length - a.values.length);
	// 	numPages = Math.ceil(grData.length / offset);
	// 	curPage = 0;
	// 	numPagesArray = Array.from(Array(numPages));
	// }
</script>

<div class=" flex flex-col">
	<VerticalList
		className="flex-grow"
		data={grData.slice(curPage * offset, curPage * offset + offset)}
		{secLabel}
	/>
	<div class="mt-3">
		{#if numPagesArray.length > 1}
			{#each numPagesArray as n, i}
				<button
					on:click={() => (curPage = i)}
					class="border px-2 mr-1 {curPage === i && 'bg-blue-500'}">{i + 1}</button
				>
			{/each}
		{/if}
	</div>
</div>

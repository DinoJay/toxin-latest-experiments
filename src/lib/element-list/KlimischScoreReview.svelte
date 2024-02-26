<script>
	export let score;
	export let sum;
	export let key;
	export let revised_categovry;

	// console.log($$props);
</script>

{#if key === 'klimischScore'}
	:{revised_category}
{/if}
{#if key === 'c1' || key === 'c2' || key === 'c3' || key === 'c4' || key == 'c5'}
	{sum}
{/if}

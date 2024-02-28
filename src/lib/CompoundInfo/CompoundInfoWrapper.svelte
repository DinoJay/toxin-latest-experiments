<script>
	export let results;
	export let imgSrc;
	export let data;

	// import ArrowRightSFill from 'svelte-remixicon/lib/icons/ArrowRightSFill.svelte';
	import CompoundInfo from './CompoundInfo.svelte';
	import ToxicologicalData from './ToxicologicalData.svelte';

	console.log('props compoundinfo WRAPPER', $$props);

	console.log('$$props', $$props);
</script>

<CompoundInfo {...$$props} />
<ToxicologicalData {...$$props} />

<script>
	import OECDToolbox from './OECDToolbox.svelte';

	export let label;
	export let imgSrc;
	export let ec_number;
	export let cas_number;
	export let empirical_formula;
	export let function_and_uses;
	export let see_also;
	export let SMILES;
	export let additional_info;
	export let data;

	function omit(key, obj) {
		const { [key]: omitted, ...rest } = obj;
		return rest;
	}

	console.log('data', data);
</script>

<div class="">
	<div class="flex">
		<div class="mr-auto">
			<h1 class="font-bold">Chemical Name</h1>
			<div class="p-2">{label}</div>
		</div>
		<img
			style="height:200px"
			class="border object-contain"
			height="200"
			width="200"
			src={`https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${SMILES}/PNG`}
			alt="chemical compound"
		/>
	</div>
	<div class="">
		<h2>Characteristics:</h2>
		<ul class="h-64 overflow-auto">
			{#each Object.entries(omit('additional_info', omit('id', data))) as d}
				<li><span class="font-bold">{d[0].replaceAll('_', ' ')}</span>: {d[1]}</li>
			{/each}
			<li><span class="font-bold">additional info</span>: {data.additional_info}</li>
		</ul>
	</div>
	<OECDToolbox cas={data.CAS_number?.replace(/-/g, '')} />
</div>

<style>
	h1 {
		@apply text-xl;
	}
	h2 {
		@apply text-lg;
	}
</style>

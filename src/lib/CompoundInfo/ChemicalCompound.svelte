<script>
	export let chemicalIdentity;
	export let openId;
	export let onClick;
	import { constructQuery, getSparqlQueryString } from '$lib/sparql';
	import Expandable from '$lib/Expandable.svelte';
	import { casRegex, smilesRegex } from '$lib/chemRegexes';
	import { CHEMICAL_IDENTITY } from '$lib/endpoint_constants';
	import CompoundInfoWrapper from './CompoundInfoWrapper.svelte';

	let promise;

	let inputVal = 'C1=CC=C(C(=C1)NCCO)[N+](=O)[O-]';
	// let imgPromise = null;
	let compound = null;
	// const defaultComp = chemicalIdentity.find((d) => d.smiles.toLowerCase() === q.toLowerCase());
	console.log('chemicalIdentity', chemicalIdentity);
</script>

<h2 class="text-xl">Chemical Compound</h2>
<form
	class=""
	on:submit={(e) => {
		e.preventDefault();
		const trimmed = inputVal.trim();
		const smilesMatch = !!trimmed.match(smilesRegex);
		const casMatch = !!trimmed.match(casRegex);
		let sparqlQueryArg = null;
		if (casMatch) sparqlQueryArg = { cas: trimmed };
		else if (smilesMatch) sparqlQueryArg = { smiles: trimmed };
		else sparqlQueryArg = { inci: trimmed };

		promise = constructQuery({ endpoint: CHEMICAL_IDENTITY, ...sparqlQueryArg }).then((res) => {
			console.log('res', res);
			return {
				...res,
				...sparqlQueryArg,
				imgSrc: e,
				type: 'compound'
			};
		});
	}}
>
	<div class="text-lg ">
		<label for="compound">‘CAS No’ or ‘INCI ’ or ‘SMILES’</label>
		<input bind:value={inputVal} class="border m-1" type="text" id="compound" name="compound" />
	</div>
	<button class="border p-2 w-full" type="submit">Go!</button>
</form>

<div class="border mt-3 p-3 flex flex-col flex-grow">
	{#if promise}
		{#await promise}
			<p>...waiting</p>
		{:then res}
			{#if res.type === 'compound'}
				<div class="">
					<CompoundInfoWrapper {...res} />
				</div>
			{/if}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	{:else}
		<div class="flex default-cont flex-grow">
			<div class="m-auto text-xl font-bold">Please select and apply a filter</div>
		</div>
	{/if}
</div>

<style>
	fieldset {
		@apply mr-4;
		@apply mb-3;
		@apply border-2;
	}
	fieldset legend {
		@apply mx-3;
	}
</style>

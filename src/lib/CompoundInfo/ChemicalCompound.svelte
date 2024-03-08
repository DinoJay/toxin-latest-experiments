<script>
	export let chemicalIdentity;
	export let openId;
	export let onClick;
	import {
		constructChemicalIdentitPreviewyQuery,
		constructQuery,
		getSparqlQueryString
	} from '$lib/sparql';
	import Expandable from '$lib/Expandable.svelte';
	import { casRegex, smilesRegex } from '$lib/chemRegexes';
	import { CHEMICAL_IDENTITY } from '$lib/endpoint_constants';
	import CompoundInfoWrapper from './CompoundInfoWrapper.svelte';
	import transformObject from '$lib/transformObject';
	import Panel from '$lib/Panel.svelte';
	import DropDown from '$lib/DropDown.svelte';
	import uniqBy from '$lib/uniqBy';

	let promise;

	let inputVal = '';
	// let imgPromise = null;

	let previewValues = null;

	constructChemicalIdentitPreviewyQuery().then((d) => {
		// console.log('d', d);
		const { bindings } = d?.results;
		const data = bindings.map(transformObject).map((d) => d.label);
		// console.log('data', data);
		previewValues = [...new Set(data)];
	});

	$: filteredPreviewValues =
		inputVal !== ''
			? previewValues?.filter((d) => d.toLowerCase().includes(inputVal.toLowerCase()))
			: previewValues;
	$: console.log('filteredPreviewValues', filteredPreviewValues);

	$: disabled = inputVal === '';
</script>

<div class=" p-2">
	<h2 class="text-xl">Chemical Compound</h2>
	<form
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
				console.log('res Search', res);

				const { bindings } = res?.results;
				console.log('BIndings', bindings);
				const data = uniqBy(
					bindings.map(transformObject).filter((d) => !!d.cas_number),
					'label'
				);
				console.log('data', data);
				return {
					...res,
					data,
					...sparqlQueryArg,
					imgSrc: e,
					type: 'compound'
				};
			});
		}}
	>
		<div class="bg-gray-50 p-1">
			<div class="text-xl flex items-center mb-1 ">
				<label for="compound">‘CAS No’ or ‘INCI ’ or ‘SMILES’</label>
				<input
					bind:value={inputVal}
					placeholder="Enter or select a compound..."
					class="border m-1 p-1 flex-grow"
					type="text"
					id="compound"
					name="compound"
					on:change={(e) => {
						inputVal = e.target.value;
					}}
				/>
			</div>
			<DropDown>
				{#if filteredPreviewValues}
					{#each filteredPreviewValues as d}
						<li class="border-b p-1 mb-1 cursor-pointer" on:click={() => (inputVal = d)}>{d}</li>
					{/each}
					{#if filteredPreviewValues.length === 0}
						<li class=" p-2 mb-1 cursor-pointer">No matches found</li>
					{/if}
				{:else}
					Loading...
				{/if}
			</DropDown>
		</div>
		<button class="border-2 p-2 mt-3 w-full " class:opacity-30={disabled} type="submit" {disabled}
			>Go!</button
		>
	</form>
</div>

<div class=" mt-3 p-3 flex flex-col flex-grow">
	{#if promise}
		{#await promise}
			<p>...waiting</p>
		{:then res}
			{#if res.type === 'compound'}
				{#each res.data as d}
					<Panel title={d.label} cls="mb-3" open={res.data.length === 1}>
						<CompoundInfoWrapper {...d} />
					</Panel>
				{/each}
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

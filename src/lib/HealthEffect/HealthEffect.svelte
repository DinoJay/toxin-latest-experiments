<script>
	import App from '$lib/App.svelte';
	import CompoundInfoWrapper from '$lib/CompoundInfo/CompoundInfoWrapper.svelte';
	import { getDefaultValues } from '$lib/defaultValues';
	import {
		ACUTE_TOXICITY,
		CARCINOGENICIY,
		MUTAGENICITY,
		REPEATED_DOSE_TOXICITY,
		SKIN_SENSITISATION_UNMERGED,
		TOXICOKINETICS_AND_SKIN_ABSORPTION
	} from '$lib/endpoint_constants';

	import Expandable from '$lib/Expandable.svelte';
	import extractDeepVars from '$lib/extractDeepVars';
	import { groups } from '$lib/group';
	import { constructQuery, transformBindings } from '$lib/sparql.js';
	import transformObject from '$lib/transformObject';
	import get from 'lodash.get';
	import CompoundList from './CompoundList.svelte';
	import set from 'lodash.set';
	import klimischScore from '$lib/klimischScore';
	export let openId;
	let promise;
	export let onClick;

	const repeatedDoseExtFilterNames = [
		{ id: 'gross necropsy: liver', synonyms: [], var: 'gross_necropsyXliver' },
		{ id: 'histopathology: liver', synonyms: [], var: 'histopathologyXliver' },
		{ id: 'alanine aminotransferase', var: 'alanine_aminotransferase', synonyms: ['ALT', 'ALAT'] },
		{ id: 'aspartate aminotransferase', synonyms: [], var: 'aspartate_aminotransferase' },
		{ id: 'alkaline phosphatase', synonyms: [], var: 'alkaline_phosphatase' },
		{ id: 'gamma glutamyl transpeptidase', synonyms: [], var: null },
		{ id: 'sorbitol dehydrogenase', synonyms: [], var: null },
		{ id: 'total bilirubin', synonyms: [] },
		{ id: 'total cholesterol', synonyms: [] },
		{ id: 'fasting triglycerides', synonyms: [] },
		{ id: 'high-density lipoprotein (hdl)', synonyms: [] },
		{ id: 'low-density lipoprotein (ldl)', synonyms: [] },
		{ id: 'total protein', synonyms: [] },
		{ id: 'albumin', synonyms: [] }
	];

	const data = [
		{ label: 'Acute Toxicity', endpoint: ACUTE_TOXICITY },
		// { label: 'Skin sensitisation', endpoint: SKIN_SENSITISATION_UNMERGED },
		{
			label: 'Repeated dose toxicity',
			endpoint: REPEATED_DOSE_TOXICITY,
			filters: repeatedDoseExtFilterNames
		},
		{
			label: 'Toxicokinetics and Skin absorption',
			endpoint: TOXICOKINETICS_AND_SKIN_ABSORPTION
		}
		// { label: 'Mutagenicity', endpoint: MUTAGENICITY },
		// { label: 'Carcinogenicity', endpoint: CARCINOGENICIY }
	];
	// { label: 'Photo-induced toxicity' },
	// { label: 'Human data' },
	// { label: 'Special investigations' },
	// { label: 'Absorption' },
	// { label: 'Toxicokinetics' },
	// { label: 'Distribution' },
	// { label: 'Metabolism' },
	// { label: 'Extraction' }

	let oecd = true;
	let nonOecd = true;

	let invivo = true;
	let invitro = true;
	let insilico = true;
	let inchemico = true;

	let endpoint = REPEATED_DOSE_TOXICITY;

	let repeatedDoseExtFilterVals = repeatedDoseExtFilterNames.map((d) => null);

	// $: console.log('endpoint', repeatedDoseExtFilterVals);

	$: repeatedDoseToxicityFilters = repeatedDoseExtFilterNames.map((d, i) => ({
		...d,
		name: d.id,
		value: repeatedDoseExtFilterVals[i]
	}));

	$: console.log('filters', repeatedDoseToxicityFilters);
	$: getData = () => {
		console.log('endpoint', endpoint);
		promise = constructQuery({ endpoint, filters: repeatedDoseToxicityFilters }).then(
			(response) => {
				const { bindings } = response.results;

				const { finalData: reportData, preresults } = transformBindings(bindings, endpoint);

				const selFilters = repeatedDoseToxicityFilters?.filter((d) => !!d.value);
				console.log('selFilters', selFilters);
				console.log('reportData', reportData);
				console.log('preresults', preresults);
				// const testfiltData = preresults.filter((d) => Object.keys());

				const filteredData = preresults
					.filter(
						(d) => {
							const matchedFilters = selFilters.filter((f) => {
								const fullVarName = Object.keys(d).find((k) => f.var && k.includes(f.var));
								if (fullVarName) {
									console.log('fullVarName', fullVarName);
									return d[fullVarName].includes(f.value);
								}
								return undefined;
							});
							return matchedFilters.length === selFilters.length;
						}

						// Object.keys(d).find((k) => selFilters.find((f) => k.includes(f.var)))
					)
					.map((d) => reportData.find((e) => e.id === d.id));

				// console.log('alanine', filteredData);

				const data = {
					...response,
					// preresults,
					reportData: selFilters.length ? filteredData : reportData,
					compoundLabel: response.compoundLabel,
					oecd,
					nonOecd,
					invivo,
					invitro,
					insilico,
					inchemico,
					endpoint,
					type: 'health-effect'
				};
				console.log('DATA', data);
				return data;
			}
		);
	};
</script>

<h2 class="text-xl">Health Effect</h2>
<div class="text-lg">
	<p class="mb-3">Look for compounds with a specific toxicological outcome</p>
	<form on:submit={(e) => e.preventDefault()}>
		<div class="mb-3">
			<div class="">
				<label for="toxi-outcome">Type the health effect or parameter of interest:</label>
				<select
					id="outcomes"
					class="ml-1 p-1 border-2"
					on:change={(e) => {
						console.log('endpoint', e.target.value);
						endpoint = e.target.value;
					}}
				>
					{#each data as d}
						<option selected={d.endpoint === REPEATED_DOSE_TOXICITY} value={d.endpoint}
							>{d.label}</option
						>
					{/each}
				</select>
			</div>
		</div>
		<div class="mb-3">
			<p>Choose the type(s) of study:</p>
			<div>
				<input type="checkbox" id="in-vivo" name="in-vivo" bind:checked={invivo} />
				<label for="in-vivo">In vivo</label>
			</div>
			<div>
				<input type="checkbox" id="in-vitro" name="in-vitro" bind:checked={invitro} />
				<label for="in-vitro">In vitro</label>
			</div>
			<!-- <div>
					<input type="checkbox" id="in-silico" name="in-silico" bind:checked={insilico} />
					<label for="in-silico">In silico</label>
				</div>
				<div>
					<input type="checkbox" id="in-chemico" name="in-chemico" bind:checked={inchemico} />
					<label for="in-chemico">In chemico</label>
				</div> -->
		</div>

		<div>
			<p>Choose the type of guideline(s):</p>
			<div>
				<input type="checkbox" id="oecd" name="oecd" bind:checked={oecd} />
				<label for="oecd">OECD</label>
			</div>
			<div>
				<input type="checkbox" id="non-oecd" name="non-oecd" bind:checked={nonOecd} />
				<label for="non-oecd">Non-OECD</label>
			</div>
		</div>

		{#if endpoint === REPEATED_DOSE_TOXICITY}
			<h2 class="mt-3 text-lg">Extended Filters:</h2>
			<div class="h-32 overflow-y-auto">
				{#each repeatedDoseExtFilterNames as filter, i}
					<div class="flex mb-3">
						<label class="crop-text" for="non-oecd">{filter.id}</label>
						<input
							bind:value={repeatedDoseExtFilterVals[i]}
							placeholder="Enter search string"
							class="ml-auto border-2 p-1"
							type="text"
							id={filter}
							name={filter}
						/>
					</div>
				{/each}
			</div>
		{/if}

		<button class="mt-3 border px-2 py-1 w-full " on:click={getData}>Go</button>
	</form>
</div>

<div class="border mt-3 p-3">
	{#if promise}
		{#await promise}
			<p>...waiting</p>
		{:then res}
			{#if res.type === 'compound'}
				<div class="">
					<CompoundInfoWrapper {...res} />
				</div>
			{/if}
			{#if res.type === 'health-effect'}
				<div class="">
					<div class="mt-3">
						<CompoundList {...$$props} {...res} />
					</div>

					<!-- <div class="mt-6">
							<SafetyAssessment {...res} />
						</div> -->
				</div>
			{/if}
		{:catch error}
			<p style="color: red">{error.message}</p>
		{/await}
	{:else}
		<div class="flex default-cont ">
			<div class="m-auto text-xl font-bold">Please select and apply a filter</div>
		</div>
	{/if}
</div>

<style>
	:global([role='listbox']) {
		margin: 20rem;
	}

	.crop-text {
		/* max-height: 2rem; */
		overflow: hidden;
		text-overflow: ellipsis;
		max-lines: 1;
		line-clamp: 1;
		-webkit-line-clamp: 1; /* number of lines to show */
	}
</style>

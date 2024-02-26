<script>
	import ElementList from '$lib/element-list/index.svelte';
	import { constructQuery } from '$lib/sparql';
	import {
		REPEATED_DOSE_TOXICITY,
		ACUTE_TOXICITY,
		SKIN_SENSITISATION_UNMERGED,
		MUTAGENICITY,
		CARCINOGENICIY
	} from '$lib/endpoint_constants';
	import { transformBindings } from '$lib/sparql';

	export let acuteToxicityCsv = [];
	export let irritationCorosivityCsv = [];
	export let repeatedToxicityCsv = [];
	export let compound;
	export let label;

	// import Table from '$lib/table.svelte';
	// console.log('$$props', $$props);
	const transformResponse = (e, endpoint) => {
		const { bindings } = e.results;
		const { reportData } = transformBindings(bindings, endpoint);

		console.log(
			'reportData',
			endpoint,
			'label',
			label,
			reportData.filter((d) => d.dossier?.includes('hc'))
		);
		return reportData.filter(
			(d) => d.dossier === label || d.dossier?.toLowerCase().includes(label.toLowerCase())
		);
	};
	let acuteToxicityPromise = constructQuery({ endpoint: ACUTE_TOXICITY })
		.then((e) => transformResponse(e, ACUTE_TOXICITY))
		.then((repData) => {
			console.log('repData Acute', repData);
			return repData;
		});

	let skinSensitisationUnmergedPromise = constructQuery({
		endpoint: SKIN_SENSITISATION_UNMERGED
	}).then((e) => transformResponse(e, SKIN_SENSITISATION_UNMERGED));

	let repeatedDoseToxicityPromise = constructQuery({ endpoint: REPEATED_DOSE_TOXICITY })
		.then((e) => transformResponse(e, REPEATED_DOSE_TOXICITY))
		.then((reportData) => {
			console.log('repData Repeated', reportData);
			return reportData;
		});

	let mutagenicityPromise = constructQuery({ endpoint: MUTAGENICITY }).then((e) =>
		transformResponse(e, MUTAGENICITY)
	);

	let carcinogenicityPromise = constructQuery({ endpoint: CARCINOGENICIY }).then((e) =>
		transformResponse(e, CARCINOGENICIY)
	);
</script>

<div>
	<h2 class="text-xl mb-3">Toxicological Data</h2>
	<div>
		{#await acuteToxicityPromise}
			<div>Loading</div>
		{:then testsByComp}
			<div>
				<h3>{testsByComp.length} {label} Opinions found in Acute Toxicity Endpoint</h3>
				<ElementList grData={testsByComp} secLabel="id" />
			</div>
		{/await}
	</div>
	<div>
		{#await repeatedDoseToxicityPromise}
			<div>Loading</div>
		{:then testsByComp}
			<div>
				<h3>{testsByComp.length} {label} Opinions found in Repeated Dose Toxicity Endpoint</h3>
				<ElementList grData={testsByComp} secLabel={(d) => d.id} />
			</div>
		{/await}
	</div>
	<div>
		{#await skinSensitisationUnmergedPromise}
			<div>Loading</div>
		{:then testsByComp}
			<div>
				<h3>{testsByComp.length} {label} Opinions found in Skin Sensitisation Unmerged Endpoint</h3>
				<ElementList grData={testsByComp} secLabel={(d) => d.id} />
			</div>
		{/await}
	</div>
	<div>
		{#await mutagenicityPromise}
			<div>Loading</div>
		{:then testsByComp}
			<div>
				<h3>{testsByComp.length} {label} Opinions found in Mutagenicity Endpoint</h3>
				<ElementList grData={testsByComp} secLabel={(d) => d.id} />
			</div>
		{/await}
	</div>
	<div>
		{#await carcinogenicityPromise}
			<div>Loading</div>
		{:then testsByComp}
			<div>
				<h3>{testsByComp.length} {label} Opinions found in Carcinogenicity Endpoint</h3>
				<ElementList grData={testsByComp} secLabel={(d) => d.id} />
			</div>
		{/await}
	</div>
</div>

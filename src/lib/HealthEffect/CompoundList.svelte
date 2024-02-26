<script>
	import ElementList from '$lib/element-list/index.svelte';
	import { groups } from '$lib/group';

	const NON_OECD = 'non OECD';
	const IN_VIVO = 'in vivo';
	const IN_VITRO = 'in vitro';

	// export let typeOfStudy;
	// export let guideline;
	export let results;

	// export let preresults;

	// export let oecd;
	// export let nonOecd;
	// export let invivo;
	// export let invitro;
	// export let varFilters;
	// export let selFilter;
	export let reportData;

	// $: console.log('oecd', oecd, 'non-oecd', nonOecd, 'invivo', invivo, 'invitro', invitro);

	// preresults
	// 	.filter((d) => {
	// 		// console.log('type', d);
	// 		const isInVivo = invivo && d.type_of_study === IN_VIVO;
	// 		const isInVitro = invitro && d.type_of_study === IN_VITRO;
	// 		const isNonOecd = nonOecd && d.guidelineLabel === NON_OECD;
	// 		const isOECD = oecd && d.guidelineLabel !== NON_OECD;

	// 		const oecdBool = isOECD || isNonOecd;
	// 		const typeBool = isInVivo || isInVitro;

	// 		// console.log('oecd', oecd && d.guideline !== NON_OECD, 'res', bool1, bool2);

	// 		// return (isInVivo || isInVitro) && (isOECD || isNonOecd);
	// 		return typeBool && oecdBool;
	// 	})
	// 	.filter((d) => {
	// 		if (!!varFilters && !!selFilter.value) {
	// 			// console.log('d', d);
	// 			const found = !!varFilters.find((f) => {
	// 				const str = d[f]?.toLowerCase().trim();
	// 				// console.log('str', str);
	// 				if (d.compoundLabel.toLowerCase().includes('vetiveryl acetate')) {
	// 				}

	// 				return (
	// 					str?.includes(selFilter.value.toLowerCase().trim()) &&
	// 					(str?.includes(selFilter.name.toLowerCase().trim()) ||
	// 						selFilter.synonyms.find((s) => str?.includes(s.toLowerCase().trim())) ||
	// 						selFilter.var === f)
	// 				);
	// 			});
	// 			return found;
	// 			// return true;
	// 		} else {
	// 			return true;
	// 		}
	// 	});

	console.log('reportData', reportData);

	const compoundData = [...groups(reportData, (d) => d.compoundLabel)]
		.map(([key, values]) => ({
			id: key,
			key,
			values
		}))
		.sort((a, b) => b.values.length - a.values.length);

	let selected = 'compound';
	const selectedClass = 'bg-blue-400';

	const oecdData = [...groups(reportData, (d) => d.guidelineLabel)]
		.map(([key, values]) => ({
			id: key,
			key,
			values
		}))
		.sort((a, b) => b.values.length - a.values.length);

	$: console.log('oecdData', oecdData);
	// $: data = selected === 'compound' ? compoundData : reportData;
	$: reportSelected = selected === 'report';
	$: oecdSelected = selected === 'oecd';
	$: compoundSelected = selected === 'compound';

	const getCurData = (sel) => {
		if (sel === 'compound') {
			return compoundData;
		} else if (sel === 'report') {
			return reportData;
		} else if (sel === 'oecd') {
			return oecdData;
		}
	};

	// 	numPages = Math.ceil(grData.length / offset);
	// 	curPage = 0;
	// 	numPagesArray = Array.from(Array(numPages));
	// }

	console.log(
		'reportData 403',
		reportData.filter((d) => d.guidelineLabel.includes('403'))
	);
	console.log('oecdData', oecdData);
</script>

<div>
	<button
		class="m-1 p-1 border-2 {compoundSelected && selectedClass}"
		on:click={() => (selected = 'compound')}>Compound View</button
	>
	<button
		class="m-1 p-1 border-2 {reportSelected && selectedClass}"
		on:click={() => (selected = 'report')}>Opinion View</button
	>
	<button
		class="m-1 p-1 border-2 {oecdSelected && selectedClass}"
		on:click={() => (selected = 'oecd')}>OECD View</button
	>
</div>
<div class=" mt-3 flex flex-col ">
	<ElementList
		grData={getCurData(selected)}
		secLabel={(d) => (selected === 'oecd' ? d.compoundLabel : d.id)}
	/>
</div>

<style>
</style>

<script>
	import uniqBy from '$lib/uniqBy';

	import DropDown from '$lib/DropDown.svelte';
	export let data;

	// $: console.log('data', data);

	let selectedData = [];

	const containsData = (id) => !!selectedData.find((d) => d.Guid === id);
	const onChange = (d) => {
		if (containsData(d.Guid)) {
			selectedData = selectedData.filter((e) => e.Guid !== d.Guid);
		} else {
			selectedData = [d, ...selectedData];
		}
	};

	// console.log('data', data);
</script>

<div class="mb-3">
	<DropDown>
		<span class="text-lg" slot="title">Select Simulator</span>
		{#each uniqBy(data, (d) => d.Guid) as d, i}
			<li class=" mb-3 flex items-center" on:change={() => onChange(d)}>
				<div class="flex-grow">{d.Caption}</div>
				<input class="ml-3" type="checkbox" checked={containsData(d.Guid)} />
			</li>
		{/each}
	</DropDown>

	<ul class="mt-6 h-80 overflow-y-auto list-disc flex flex-col" style="min-width:50%">
		{#if selectedData.length === 0}
			<div class="text-lg text-gray-700 m-auto">Please Select simulator</div>
		{/if}
		{#each selectedData as d, i}
			<li class="mb-3 ">
				<div class="flex items-center">
					<div class="font-bold">{d.Caption}</div>

					<input
						class="ml-auto"
						type="checkbox"
						on:change={() => onChange(d)}
						checked={containsData(d.Guid)}
					/>
				</div>
				<div class="italic">({d.ProductName})</div>
				<ul class="list-disc ml-9">
					{#each d.simulation as s}
						<li>{s}</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>

<script>
	import uniqBy from '$lib/uniqBy';

	import DropDown from '$lib/DropDown.svelte';
	export let data;

	console.log('OECD data', data);

	let selectedProfilerTypes = [];

	const containsProfiler = (id) => !!selectedProfilerTypes.find((d) => d.profilerType === id);

	const removeProfiler = (profilerType) =>
		selectedProfilerTypes.filter((e) => e.profilerType !== profilerType);

	const onChange = (d) => {
		if (containsProfiler(d.profilerType)) {
			selectedProfilerTypes = removeProfiler(d.profilerType);
		} else {
			selectedProfilerTypes = [d, ...selectedProfilerTypes];
		}
	};
</script>

<div class="mb-3">
	<div class="mb-6">
		<DropDown>
			<span class="text-lg" slot="title">Select Profiler</span>
			{#each data as d, i}
				<li class=" mb-3 flex items-center">
					<div class="flex-grow">{d.profilerType}</div>
					<input
						class="ml-3"
						type="checkbox"
						checked={containsProfiler(d.profilerType)}
						on:change={() => onChange(d)}
					/>
				</li>
			{/each}
		</DropDown>
	</div>

	<ul class="h-80 overflow-y-auto list-disc flex flex-col" style="min-width:50%">
		{#if selectedProfilerTypes.length === 0}
			<div class="text-lg text-gray-700 m-auto">Please Select Profiler</div>
		{/if}
		{#each selectedProfilerTypes as d, i}
			<li class="mb-6">
				<div class="flex items-center">
					<div class="font-bold ">{d.profilerType}</div>
					<!-- <input
						class="ml-auto"
						type="checkbox"
						on:change={() => onChange(d)}
						checked={containsProfiler(d.profilerType)}
					/> -->
				</div>
				<ul>
					{#each d.profilers as p}
						<li>
							<div class="">{p.ProfilerName}</div>
							<ul class="list-disc ml-9">
								{#each p.Categories as c}
									{#if c}
										<li>{c}</li>
									{/if}
								{/each}
							</ul>
						</li>
					{/each}
				</ul>
			</li>
		{/each}
	</ul>
</div>

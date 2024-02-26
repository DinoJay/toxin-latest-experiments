<script>
	export let datum;
	export let attr;
	import CategoryElement from '$lib/element-list/categoryElement.svelte';

	let open = false;
	let openCategory = datum.values.reduce((acc, d) => ({ ...acc, [d.id]: false }), {});

	const removeKey = (obj, key) => {
		const { [key]: deletedKey, ...otherKeys } = obj;
		return otherKeys;
	};

	// console.log('datum', datum.values);
</script>

<div class="bg-thistle p-3 flex" on:keydown={() => (open = !open)} on:click={() => (open = !open)}>
	<span class="mr-1">+</span>
	<span>{datum.key}</span>
	<span class="ml-auto">{datum.values.length} opinions</span>
</div>
{#if open}
	{#each datum.values as v, i (v.id)}
		<div>
			<div
				role="button"
				class="ml-6 bg-lightblue p-3 my-2"
				on:click={() => {
					openCategory[v.id] = !openCategory[v.id];
				}}
				on:keydown={() => {
					openCategory[v.id] = !openCategory[v.id];
				}}
			>
				#{++i} Opinion
				{attr(v)}
			</div>
			<CategoryElement
				defaultValues={v.defaultValues}
				defaultKeys={v.defaultKeys}
				open={openCategory[v.id]}
				categories={v}
			/>
		</div>
	{/each}
{/if}

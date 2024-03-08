<script>
	import TabItem from './TabItem.svelte';
	import HealthEffectFilter from '$lib/HealthEffect/HealthEffect.svelte';
	import ChemicalCompoundFilter from '$lib/CompoundInfo/ChemicalCompound.svelte';
	import CompoundList from '$lib/HealthEffect/CompoundList.svelte';
	import CompoundInfoWrapper from '$lib/CompoundInfo/CompoundInfoWrapper.svelte';
	import Tabs from './Tabs.svelte';

	let promise = null;
	$: console.log('props ', $$props);
	let openId = null;
	const clickWrapper = (key) => () => openId === key ? (openId = null) : (openId = key);
</script>

<div class="mt-3 flex flex-col flex-grow">
	<Tabs cls="mb-3">
		<TabItem title="Chemical Compound">
			<div class=" flex flex-col flex-grow " style="">
				<ChemicalCompoundFilter
					{...$$props}
					bind:promise
					{openId}
					onClick={clickWrapper('ChemicalCompound')}
				/>
				<!-- <EndpointTypeFilter /> -->
				<!-- <TestSubstanceFilter /> -->
			</div>
		</TabItem>
		<TabItem title="Health Effect">
			<div class=" flex flex-col flex-grow cont">
				<HealthEffectFilter
					{...$$props}
					bind:promise
					{openId}
					onClick={clickWrapper('HealthEffect')}
				/>
			</div>
		</TabItem>
	</Tabs>
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		/* grid-template-rows: 1fr 1fr; */
		gap: 5px 5px;
		grid-template-areas:
			'. .'
			'. .'
			'. .';
	}
	.default-cont {
		height: 500px;
	}
	.cont {
		/* min-width: 49%;
		max-width: 50%; */
		height: fit-content;
	}
	fieldset {
		@apply mr-4;
		@apply mb-3;
		@apply border-2;
	}
	fieldset legend {
		@apply mx-3;
	}
</style>

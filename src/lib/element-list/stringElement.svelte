<script>
	import { ACUTE_TOXICITY } from '$lib/endpoint_constants';
	import transformText, { transformTextToKey } from './transformText';

	export let key;
	export let value;

	export let defaultKeys;

	// console.log('key', key);
	// console.log('keys', defaultKeys);
	// console.log('defaultValues', defaultValues);
</script>

{#if value !== undefined}
	<div
		class="bg-whitesmoke p-3 mb-2 {value === undefined ? 'text-red-600' : ''}"
		class:bg-whitesmoke={!defaultKeys?.includes(key)}
		class:bg-green-200={defaultKeys?.includes(key) === true}
	>
		<button type="button">{transformTextToKey(key)}:</button>
		<div class="ml-8  ">{value}</div>
	</div>
{/if}

<script>
	import SelectProfilers from './SelectProfilers.svelte';
	import SelectData from './SelectData.svelte';

	import profilingEx from './profiling_example';
	import dataEx from './data_example';
	import group from '$lib/group';

	export let cas;

	const host = 'https://qsar.wise.vub.ac.be';

	console.log('CAS NUMBER', cas);
	const q = `/api/v6/Search/cas/${cas}/true`;

	console.log('query', `${host}${q}`);

	let profilingPromise = fetch(`${host}${q}`)
		.then((res) => res.json())
		.then((res) => {
			console.log('res', res);
			return res.length > 0 ? res[0].ChemId : null;
		})
		.then((chemId) => {
			console.log('chemId', chemId);
			const metabolismSims = `/api/v6/metabolism`;
			const promiseMetabolism = fetch(`${host}${metabolismSims}`)
				.then((res) => res.json())
				.then((sims) => {
					// console.log('metabolismSims ', sims);
					const res = Promise.all(
						sims.map((sim) => {
							const q = `/api/v6/metabolism/${sim.Guid}/${chemId}`;
							return fetch(`${host}${q}`)
								.then((res) => res.json())
								.then((res) => {
									// console.log('res', res);
									return { ...sim, simulation: res };
								});
						})
					);
					return res.then((sims) => {
						return sims.filter((sim) => sim.simulation.length > 0);
					});
				});

			const profilingQ = `/api/v6/Profiling/all/${chemId}`;
			const promiseProfiling = fetch(`${host}${profilingQ}`)
				.then((res) => res.json())
				.then((res) => {
					const grs = [...group(res, (d) => d.ProfilerType)].map(([k, v]) => ({
						profilerType: k,
						profilers: v
					}));
					// console.log('profiling grs');
					return grs;
				});

			const dataQ = `/api/v6/Data/all/${chemId}`;
			const promiseData = fetch(`${host}${dataQ}`)
				.then((res) => res.json())
				.then((res) => {
					// console.log('data', res);
					return res;
				});

			return Promise.all([promiseProfiling, promiseMetabolism]).then(([profiling, metabolism]) => ({
				profiling,
				metabolism
			}));
		});

	// profilingPromise.then((d) => console.log('result', d));
</script>

<div class="mt-3 mb-4">
	<h1 class="text-xl mb-3">OECD Toolbox</h1>
	<div class="">
		{#await profilingPromise}
			<div class="m-auto">Loading...</div>
		{:then result}
			<div class="">
				<div class="flex">
					<div style="min-width:50%; max-width:50%" class="pr-6">
						<SelectProfilers data={result.profiling} />
					</div>
					<div style="min-width:50%; max-width:50%" class="pl-6">
						<SelectData data={result.metabolism} />
					</div>
				</div>
			</div>
		{:catch error}
			error: {error}
		{/await}
	</div>
</div>

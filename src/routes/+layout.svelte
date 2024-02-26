<script>
	import '../app.css';
	let bg = true;
</script>

<div
	class="w-full h-screen absolute pointer-events-none  z-10 transition-all"
	class:bg-gray-300={bg}
	style:background={bg ? 'rgba(240, 248, 255, 0.86)' : null}
	class:pointer-events-none={!bg}
>
	<dialog open class="w-96 mt-12 bg-white transition-all border-2">
		<h2 class="text-gray-600 text-lg">Disclaimer</h2>
		<p class="text-balance ">
			<!-- TOXIN data fully covers the SCCS opinions. -->
			<!-- <br /> -->

			The Knowledge graph is still under development. Data shown in green, are default values
			assumed by the tool based on the OECD guidelines compliance.
			<!-- <br /> -->
			Criteria, Questions, and initial and revised category of the Klimisch score follow the ToxRtool.
		</p>
		<button
			class="w-full border-2 border-black p-2 mt-3 pointer-events-auto"
			on:click={() => {
				document.querySelector('dialog').close();
				bg = false;
			}}>OK</button
		>
	</dialog>
</div>
<main class="max-w-screen-lg h-screen mx-auto flex flex-col flex-grow">
	<nav class="flex items-center justify-between flex-wrap bg-indigo-500 p-6">
		<div class="flex items-center text-white mr-6 w-12">
			<svg
				class="h-8 w-8 mr-2"
				width="54"
				height="54"
				viewBox="0 0 54 54"
				xmlns="http://www.w3.org/2000/svg"
				><path
					d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z"
				/></svg
			>
		</div>
		<div class="font-semibold text-xl tracking-tight">TOXIN</div>
	</nav>
	<slot />
</main>

<style>
	::backdrop {
		background-color: rgba(0, 0, 255, 0.5);
	}

	dialog {
		z-index: 100;
		pointer-events: none;
		opacity: 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	dialog[open] {
		opacity: 1;
		pointer-events: inherit;
	}
</style>

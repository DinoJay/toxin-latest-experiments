<script>
	export let cls = '';
	export let height = '50px';
	export let width = '50px';
</script>

<div class="loading border-gray-700 border-4 {cls}" style:height style:width />

<style>
	.loading {
		display: inline-block;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		border-top-color: #fff;
		animation: spin 1s ease-in-out infinite;
		-webkit-animation: spin 1s ease-in-out infinite;
	}

	@keyframes spin {
		to {
			-webkit-transform: rotate(360deg);
		}
	}
</style>

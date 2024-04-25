<script>
	import { slide } from 'svelte/transition'
</script>

<div transition:slide={{ duration: 350 }} class="grid place-content-center">
	<span class="loader" />
</div>

<style lang="postcss">
	.loader {
		@apply w-8 aspect-square rounded-[50%] inline-block border-t-[3px] border-t-turqoise border-r-[3px] border-r-transparent;
		animation: rotation 1s linear infinite;
	}

	@keyframes rotation {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>

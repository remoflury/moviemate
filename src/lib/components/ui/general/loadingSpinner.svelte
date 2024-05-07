<script lang="ts">
	import { slide } from 'svelte/transition'

	export let color: 'turqoise' | 'blue' | 'white' = 'turqoise'
</script>

<div transition:slide={{ duration: 350 }} class="grid place-content-center">
	<span
		class="loader"
		class:turqoise={color === 'turqoise'}
		class:white={color === 'white'}
		class:blue={color === 'blue'}
	/>
</div>

<style lang="postcss">
	.loader {
		@apply w-[1em] aspect-square rounded-[50%] inline-block border-t-[3px] border-r-[3px] border-r-transparent;
		animation: rotation 1s linear infinite;
	}

	.loader.turqoise {
		@apply border-t-turqoise;
	}
	.loader.white {
		@apply border-t-white;
	}
	.loader.blue {
		@apply border-t-blue;
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

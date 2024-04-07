<script lang="ts">
	export let color: 'blue' | 'white' = 'white'
</script>

<figure class="w-[1em] aspect-square spin">
	<svg viewBox="0 0 18.897 18.897">
		<path
			class:fill-blue={color === 'blue'}
			class:fill-white={color === 'white'}
			d="M9.433,16.555a6.862,6.862,0,0,1-3.07-13l.576,1.15a5.575,5.575,0,1,0,4.987,0l.576-1.15a6.862,6.862,0,0,1-3.07,13Z"
			transform="translate(9.888 -4.332) rotate(45)"
		/>
	</svg>
</figure>

<style lang="postcss">
	.spin {
		animation: spin 1.75s linear infinite;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>

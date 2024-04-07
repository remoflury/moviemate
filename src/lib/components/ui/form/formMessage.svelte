<script lang="ts">
	import { slide } from 'svelte/transition'

	export let message: string
	export let success: boolean = false
</script>

<article
	transition:slide={{ duration: 300 }}
	class="mt-6 first:mt-0 rounded-xl p-3"
	class:bg-green={success}
	class:bg-red={!success}
>
	<small>{message}</small>
</article>

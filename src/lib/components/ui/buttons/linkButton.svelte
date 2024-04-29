<script lang="ts">
	import { createEventDispatcher } from 'svelte'

	export let text: string
	export let type: 'button' | 'submit' | 'reset' = 'submit'
	export let disabled: boolean = false

	const dispatch = createEventDispatcher()

	const handleClick = () => {
		dispatch('click')
	}
</script>

<button on:click={handleClick} {type} {disabled} class={$$props.class}>
	<small class="text-turqoise">{text}</small>
</button>

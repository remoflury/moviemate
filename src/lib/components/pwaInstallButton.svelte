<script lang="ts">
	import { onMount } from 'svelte';

	let deferredPrompt: Event | null = null;
	let btnElem: HTMLButtonElement;
	let isPWAUsed: boolean = false;

	const installPWA = async () => {
		const event = new Event('beforeinstallprompt');
		if (deferredPrompt !== null) {
			//@ts-ignore
			deferredPrompt.prompt();
			//@ts-ignore
			const { outcome } = await deferredPrompt.userChoice;
			if (outcome === 'accepted') {
				deferredPrompt = null;
			}
		}
	};

	const checkIfUserIsOnPWA = (): boolean => {
		// let displayMode = 'browser tab';
		if (window.matchMedia('(display-mode: standalone)').matches) {
			// displayMode = 'standalone';
			return true;
		}
		return false;
		// Log launch display mode to analytics
		// console.log('DISPLAY_MODE_LAUNCH:', displayMode);
	};

	onMount(() => {
		isPWAUsed = checkIfUserIsOnPWA();
	});
</script>

<svelte:window
	on:beforeinstallprompt={(event) => {
		console.log(event);
		event.preventDefault();
		deferredPrompt = event;
	}}
/>

{#if isPWAUsed}
	<div class="flex gap-x-8 flex-wrap items-center">
		<a class="underline" href="/login">Login</a>
		<a class="underline" href="/register">Register</a>
	</div>
{:else}
	<button class="btn" on:click={installPWA} bind:this={btnElem}> Install App </button>
{/if}

<script lang="ts">
	import { onMount } from 'svelte';

	let deferredPrompt: Event | null = null;
	let btnElem: HTMLButtonElement;
	let isPWAUsed: boolean = false;
	let isChrome: boolean = false;

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

	const checkForChromeBrowser = (): boolean => {
		// Detect Chrome
		//@ts-ignore
		return !!window.chrome;
	};

	const checkIfUserIsOnPWA = (): boolean => {
		// check if pwa or web instance is used
		if (window.matchMedia('(display-mode: standalone)').matches) {
			return true;
		}
		return false;
	};

	onMount(() => {
		isPWAUsed = checkIfUserIsOnPWA();
		// isChrome = checkForChromeBrowser();
	});
</script>

<svelte:window
	on:beforeinstallprompt={(event) => {
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
	<div class="flex flex-col items-center">
		<!-- {#if isChrome} -->
		<button class="btn" on:click={installPWA} bind:this={btnElem}>Install App</button>
		<!-- {:else} -->
		<p class="mt-4 text-sm text-center">To install the app, please open in Chrome Browser.</p>
		<!-- {/if} -->
	</div>
{/if}

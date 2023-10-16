<script lang="ts">
	let deferredPrompt: Event | null = null;
	let btnElem: HTMLButtonElement;

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
</script>

<svelte:window
	on:beforeinstallprompt={(event) => {
		console.log(event);
		event.preventDefault();
		deferredPrompt = event;
	}}
/>

<button class="btn" bind:this={btnElem}> Install App </button>

<script lang="ts">
	import { page } from '$app/stores'
	import Logo from '$lib/assets/logo.svelte'
	import SettingsIcon from '$lib/assets/settingsIcon.svelte'
</script>

<header class="container grid grid-cols-4 gap-x-4 py-1 border-b border-gray-dark">
	{#if $page.url.pathname.split('/')[1] === 'profile' && $page.url.pathname.split('/').length === 2}
		<a href="/profile/settings" class="max-w-8 self-center">
			<SettingsIcon />
		</a>
	{/if}
	<figure class="col-span-2 col-start-2 max-w-1/2 mx-auto">
		<Logo />
	</figure>
</header>

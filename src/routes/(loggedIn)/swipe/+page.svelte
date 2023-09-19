<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import PrimaryButton from '$lib/components/primaryButton.svelte';

	// console.log($page)
</script>

<section>
	<h1>Swipe</h1>

	{#if $page.data.session}
		<form method="POST" action="/logout?/logout" use:enhance class="mt-8">
			<PrimaryButton text="Logout" />
		</form>
	{/if}
</section>

<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import PrimaryButton from '$lib/components/primaryButton.svelte';
</script>

<section class="container">
	<h1>Profile</h1>
	{#if $page.data.session}
		<form method="POST" action="/logout?/logout" use:enhance class="mt-8">
			<PrimaryButton text="Logout" />
		</form>
	{/if}
</section>

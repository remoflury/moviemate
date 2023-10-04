<script>
	import { enhance } from '$app/forms';
	import PrimaryButton from '$lib/components/primaryButton.svelte';
	import InputMessage from '$lib/components/inputMessage.svelte';
	import Link from '$lib/components/link.svelte';
	import LoadingSpinner from '$lib/components/loadingSpinner.svelte';
	import { showSettings } from '$lib/stores/menu';
	$showSettings = false;

	export let form;

	let loading = false;
	$: if (form) loading = false;
</script>

<section class="container">
	<h1>Login</h1>

	<form
		method="POST"
		action="?/login"
		use:enhance
		on:submit|preventDefault={() => (loading = true)}
	>
		<label for="email" hidden>Email</label>
		<input
			type="email"
			name="email"
			id="email"
			placeholder="Email"
			required
			value={form?.email ?? ''}
		/>

		<label for="password" hidden>Password</label>
		<input
			type="password"
			name="password"
			id="password"
			placeholder="Password"
			required
			minlength="6"
		/>

		{#if form?.error}
			<InputMessage message={form?.error} />
		{/if}

		<!-- {#if form?.success}
      <InputMessage message="To login, check your emails." success={true}/>
    {/if} -->

		{#if !loading && !form?.success}
			<div class="fixed bottom-12 left-0 w-full t-8">
				<PrimaryButton text="Login" />
				<Link message="Don't have an account? Sign up here." link="/register" />
			</div>
		{/if}
		{#if loading}
			<div class="mt-8">
				<LoadingSpinner />
			</div>
		{/if}
	</form>
</section>

<script lang="ts">
	import { enhance } from '$app/forms';
	import PrimaryButton from '$lib/components/primaryButton.svelte';
	import InputMessage from '$lib/components/inputMessage.svelte';
	import Link from '$lib/components/link.svelte';
	import LoadingSpinner from '$lib/components/loadingSpinner.svelte';
	import { showGoBack, showSettings } from '$lib/stores/menu';
	import SelectAvatar from '$lib/components/mates/selectAvatar.svelte';
	$showSettings = false;
	$showGoBack = false;

	export let form;

	let loading = false;
	$: if (form) loading = false;

	let currentAvatarIndex = 1;
</script>

<section class="container">
	<h1>Register</h1>
	<form
		method="POST"
		action="?/register"
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
		{#if form?.emailError}
			<InputMessage message={form?.emailError} />
		{/if}

		<label for="username" hidden>Username</label>
		<input
			type="text"
			name="username"
			id="username"
			required
			placeholder="Username"
			minlength="3"
			value={form?.username ?? ''}
		/>
		{#if form?.usernameError}
			<InputMessage message={form?.usernameError} />
		{/if}

		<label for="password" hidden>Password</label>
		<input
			type="password"
			name="password"
			id="password"
			placeholder="Password"
			required
			minlength="6"
			value={form?.password ?? ''}
		/>

		{#if form?.passwordError}
			<InputMessage message={form?.passwordError} />
		{/if}

		<div class="mt-6">
			<label class="pt-4" for="avatar" hidden>Avatar</label>
			<div class="px-28">
				<input type="hidden" name="avatar" bind:value={currentAvatarIndex} />
				<SelectAvatar
					initialAvatarId={Number(form?.avatar) ?? 1}
					on:changeAvatar={(e) => {
						currentAvatarIndex = e.detail.imageNumber;
					}}
				/>
			</div>
		</div>

		{#if !loading && !form?.success}
			<div class="w-full mt-8">
				<PrimaryButton text="Register" />
				<Link message="Already have an account? Login here." link="/login" />
			</div>
		{/if}

		{#if loading}
			<div class="mt-8">
				<LoadingSpinner />
			</div>
		{/if}

		{#if form?.success}
			<InputMessage
				message="Registration successful. Please check your mails to verify your account"
				success={true}
			/>
		{/if}
	</form>
</section>

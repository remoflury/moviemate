<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { showSettings, showGoBack } from '$lib/stores/menu';
	import PrimaryButton from '$lib/components/primaryButton.svelte';
	import Avatar from '$lib/components/mates/avatar.svelte';

	$showSettings = false;
	$showGoBack = true;
</script>

<section class="container relative">
	<h1 class="text-center">Settings</h1>
	<div class="flex flex-col items-center px-28 pb-5">
		<Avatar />
		<p class="info mt-4">{$page.data.user.username}</p>
	</div>
	<div class="pb-10">
		<form method="POST" action="/logout?/logout" use:enhance class="mt-8">
			<PrimaryButton text="Logout" />
		</form>
	</div>

	<article class="pb-10">
		<h2>Tutorial</h2>
		<p>How to use the app. Click <a href="/profile/settings/how-to" target="_blank" class="underline underline-offset-2">here</a> for a tutorial.</p>
	</article>

	<article class="pb-10">
		<h2>Privacy</h2>
		<p>Text Text Text</p>
	</article>

	<article class="pb-10">
		<h2>Legal Notice</h2>
		<p>Text Text Tex</p>
	</article>

	<article class="pb-10">
		<h2>Credits</h2>
		<p>
			This product uses the <a
				href="https://developers.themoviedb.org/3"
				target="_blank"
				class="underline underline-offset-2">TMDb API</a
			> but is not endorsed or certified by TMDb.
		</p>
		<a
			class="max-w-[30%] block mt-4"
			href="https://www.themoviedb.org/"
			target="_blank"
			aria-label="go to themoviedb.org"
		>
			<img src="/logo/tmdb-logo.svg" alt="Logo of the Movie Database" />
		</a>
	</article>
</section>

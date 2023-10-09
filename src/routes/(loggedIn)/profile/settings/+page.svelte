<script lang="ts">
	import { PUBLIC_APP_URL } from '$env/static/public';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import { showSettings, showGoBack } from '$lib/stores/menu';
	import PrimaryButton from '$lib/components/primaryButton.svelte';
	import Avatar from '$lib/components/mates/avatar.svelte';

	$showSettings = false;
	$showGoBack = true;
</script>

<section class="container relative">
	<h1>Settings</h1>
	<div class="flex flex-col items-center px-28 pb-5">
		<Avatar />
		<p class="info mt-4">{$page.data.user.username}</p>
	</div>
	<div class="pb-10">
		<form method="POST" action="/logout?/logout" use:enhance class="mt-8">
			<PrimaryButton text="Logout" />
		</form>
	</div>

	<div class="pb-10">
		<h2>Reference</h2>

		<p>
			We used <a
				class="underline underline-offset-2"
				href="https://developers.themoviedb.org/3"
				target="blank"
				>The Movie Database API
			</a>
		</p>
	</div>

	<div class="pb-10">
		<h2>Privacy</h2>
		<p>Text Text Text</p>
	</div>

	<div class="pb-10">
		<h2>Legal Notice</h2>
		<p>Text Text Text</p>
	</div>
</section>

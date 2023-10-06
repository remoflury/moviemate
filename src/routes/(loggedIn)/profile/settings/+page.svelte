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
        <h1>Reference</h1>
        <p>We used the Movie Database API https://developers.themoviedb.org/3</p>
    </div>

    <div class="pb-10">
        <h1>Privacy</h1>
        <p>Text Text Text</p>
    </div>

    <div class="pb-10">
        <h1>Legal Notice</h1>
        <p>Text Text Text</p>
    </div>
	
</section>

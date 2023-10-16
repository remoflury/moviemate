<script lang="ts">
    import { enhance } from '$app/forms';
    import { page } from '$app/stores';
    import { showSettings, showGoBack } from '$lib/stores/menu';
    import PrimaryButton from '$lib/components/primaryButton.svelte';
    import Avatar from '$lib/components/mates/avatar.svelte';

    $showSettings = false;
    $showGoBack = false;

    function toggleContent(event) {
        const content = event.target.nextElementSibling;
        content.classList.toggle('hidden');
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter') {
            toggleContent(event);
        }
    }
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

    <article >
        <svg xmlns="http://www.w3.org/2000/svg" width="8.576" height="15" viewBox="0 0 8.576 15"><path id="Icon_Pfeil_gerade" data-name="Icon Pfeil gerade" d="M13.836,13.692l5.676-5.671a1.072,1.072,0,0,0-1.518-1.514l-6.43,6.426a1.07,1.07,0,0,0-.031,1.478l6.457,6.47a1.072,1.072,0,0,0,1.518-1.514Z" transform="translate(19.826 21.194) rotate(180)" fill="#2ec4b6"/></svg>
       <h2 class="cursor-pointer" on:click={toggleContent} on:keydown={handleKeyPress} tabindex="0">Tutorial</h2>
        <p class="hidden">How to use the app. Click <a href="/profile/settings/how-to" class="underline underline-offset-2">here</a> for a tutorial.</p>
    </article>

    <article >
        <svg xmlns="http://www.w3.org/2000/svg" width="8.576" height="15" viewBox="0 0 8.576 15"><path id="Icon_Pfeil_gerade" data-name="Icon Pfeil gerade" d="M13.836,13.692l5.676-5.671a1.072,1.072,0,0,0-1.518-1.514l-6.43,6.426a1.07,1.07,0,0,0-.031,1.478l6.457,6.47a1.072,1.072,0,0,0,1.518-1.514Z" transform="translate(19.826 21.194) rotate(180)" fill="#2ec4b6"/></svg>
       <h2 class="cursor-pointer" on:click={toggleContent} on:keydown={handleKeyPress} tabindex="0">Privacy</h2>
        <p class="hidden">Click <a href="/profile/settings/how-to" class="underline underline-offset-2">here</a> to see the Privacy</p>
    </article>

    <article >
    	<svg xmlns="http://www.w3.org/2000/svg" width="8.576" height="15" viewBox="0 0 8.576 15"><path id="Icon_Pfeil_gerade" data-name="Icon Pfeil gerade" d="M13.836,13.692l5.676-5.671a1.072,1.072,0,0,0-1.518-1.514l-6.43,6.426a1.07,1.07,0,0,0-.031,1.478l6.457,6.47a1.072,1.072,0,0,0,1.518-1.514Z" transform="translate(19.826 21.194) rotate(180)" fill="#2ec4b6"/></svg>
       <h2 class="cursor-pointer" on:click={toggleContent} on:keydown={handleKeyPress} tabindex="0">Legal Notice</h2>
        <p class="hidden">Click <a href="/profile/settings/how-to" class="underline underline-offset-2">here</a> to see the Legal Notice</p>
    </article>

    <article >
		<svg xmlns="http://www.w3.org/2000/svg" width="8.576" height="15" viewBox="0 0 8.576 15"><path id="Icon_Pfeil_gerade" data-name="Icon Pfeil gerade" d="M13.836,13.692l5.676-5.671a1.072,1.072,0,0,0-1.518-1.514l-6.43,6.426a1.07,1.07,0,0,0-.031,1.478l6.457,6.47a1.072,1.072,0,0,0,1.518-1.514Z" transform="translate(19.826 21.194) rotate(180)" fill="#2ec4b6"/></svg>
        <h2 class="cursor-pointer" on:click={toggleContent} on:keydown={handleKeyPress} tabindex="0">Credits</h2>
        <p class="hidden">
            This product uses the <a
                href="https://developers.themoviedb.org/3"
                target="_blank"
                class="underline underline-offset-2">TMDb API</a
            > but is not endorsed or certified by TMDb.
        
        <a
            class="max-w-[30%] block mt-4"
            href="https://www.themoviedb.org/"
            target="_blank"
            aria-label="go to themoviedb.org"
        >
            <img src="/logo/tmdb-logo.svg" alt="Logo of the Movie Database" />
        </a>
		</p>
    </article>
</section>

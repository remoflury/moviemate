<script>
	import AvatarSlider from '$lib/components/avatar/avatarSlider.svelte'
	import PrimaryButton from '$lib/components/ui/buttons/primaryButton.svelte'

	export let data
</script>

<section class="container section-spacing">
	<h1 class="text-center">Settings</h1>
	<AvatarSlider
		initialAvatarIndex={data.user.avatar_id}
		on:currentAvatarIndex={(e) => console.log(e.detail)}
	/>
	<p class="text-gray-dark text-center text-sm">{data.user.username}</p>
	<PrimaryButton text="Logout" />
</section>

<script lang="ts">
	import { avatarImages } from '$lib/utils/data'
	import UserCard from '$lib/components/ui/cards/userCard.svelte'

	export let data

	const avatarImage = avatarImages.find((avatar) => avatar.id === data.user.avatar_id)
</script>

<section class="container section-spacing">
	<UserCard
		username={data.user.username}
		path={avatarImage?.path || avatarImages[0].path}
		class="max-w-1/2 mx-auto"
	/>
</section>

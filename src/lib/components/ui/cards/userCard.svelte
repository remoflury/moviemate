<script lang="ts">
	import AvatarImage from '$lib/components/avatar/avatarImage.svelte'
	export let path: string
	export let username: string
	export let flexDirection: 'row' | 'column' = 'column'
</script>

<div
	class="flex {$$props.class} gap-4"
	class:flex-row={flexDirection == 'row'}
	class:flex-col={flexDirection == 'column'}
>
	<AvatarImage {path} alt="Profile picture of {username}" />
	<small class="text-gray-dark text-center block">{username}</small>
</div>

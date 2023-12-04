<script lang="ts">
	export let border = false;
	export let avatarId: number = 1;
</script>

<figure class="rounded-max overflow-hidden {border ? 'border-gray-dark border' : ''}">
	<img
		class="object-cover object-center w-full h-full"
		src={`/assets/avatar-${avatarId}.webp`}
		alt="Profilbild Mate"
	/>
</figure>

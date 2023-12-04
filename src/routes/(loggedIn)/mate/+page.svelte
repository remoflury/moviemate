<script lang="ts">
	import SearchMate from '$lib/components/mates/searchMate.svelte';
	import MatesSession from '$lib/components/mates/matesSession.svelte';
	import MatesList from '$lib/components/mates/matesList.svelte';
	import { showGoBack, showSettings } from '$lib/stores/menu';

	export let data;

	console.log(data);
	$showGoBack = false;
	$showSettings = false;
</script>

<section class="container">
	<SearchMate />
</section>

<section class="container">
	<MatesList mates={data.mates || []} />
</section>

<section class="container">
	<MatesSession usersAvatarId={data.usersAvatarId} />
</section>

<script lang="ts">
	import SearchMate from '$lib/components/mates/searchMate.svelte';
	import MatesSession from '$lib/components/mates/matesSession.svelte';
	import MatesList from '$lib/components/mates/matesList.svelte';
	import { showGoBack } from '$lib/stores/menu.js';

	export let data;

	$showGoBack = false;

	// $: console.log(data)
	// console.log(data);
	// console.log(data.mates);
</script>

<section class="container">
	<SearchMate />
</section>

<section class="container">
	
	<MatesList mates={data.mates || []} />
</section>

<section class="container">
	<MatesSession />
</section>

<script lang="ts">
	import { page } from '$app/stores';
	import { enhance } from '$app/forms';
	import PrimaryButton from '$lib/components/primaryButton.svelte';

	export let data;

	console.log(data.movies);
</script>

<section class="container">
	<h1>Swipe</h1>
</section>

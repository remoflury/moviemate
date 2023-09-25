<script lang="ts">
	import { goto } from '$app/navigation';
	export let data;

	// redirect to swipe page if user is logged in
	$: if (data.session) goto('/swipe');
</script>

<section>
	<h1>Welcome to MovieMate</h1>
	<div class="mt-4 flex gap-x-4">
		<a class="underline" href="/login">Login</a>
		<a class="underline" href="/register">Register</a>
	</div>
</section>

<p>Hallo</p>
<p>hallto 2</p>

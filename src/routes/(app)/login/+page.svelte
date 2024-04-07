<script lang="ts">
	import LoginForm from '$lib/components/form/loginForm.svelte'
	import Link from '$lib/components/ui/buttons/link.svelte'

	export let data
</script>

<section class="section-spacing container">
	<h1>Login</h1>
	<LoginForm actionPath="?/login" data={data.loginForm} />

	<Link href="/register" text="Don't have an account? Sign up here." />
</section>

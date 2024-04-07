<script lang="ts">
	import LoginForm from '$lib/components/form/loginForm.svelte'

	export let data
</script>

<section class="section-spacing container">
	<h1>Login</h1>
	<LoginForm actionPath="?/login" data={data.loginForm} />
</section>

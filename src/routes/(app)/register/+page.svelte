<script lang="ts">
	import RegisterForm from '$lib/components/form/registerForm.svelte'

	export let data
</script>

<section class="section-spacing container">
	<h1>Sign Up</h1>

	<RegisterForm actionPath="?/register" data={data.registerForm} />
</section>

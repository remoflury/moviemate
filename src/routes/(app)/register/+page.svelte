<script lang="ts">
	import RegisterForm from '$lib/components/form/registerForm.svelte'
	import Link from '$lib/components/ui/buttons/link.svelte'

	export let data
</script>

<section class="section-spacing container">
	<h1>Sign Up</h1>

	<RegisterForm actionPath="?/register" data={data.registerForm} />

	<Link href="/login" text="Already registered? Sign in here." />
</section>

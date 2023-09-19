<script lang="ts">
	export let message: string;
	export let link: string;
</script>

<div class="grid place-content-center">
	<a class="link text-sm mt-4" href={link}>{message}</a>
</div>

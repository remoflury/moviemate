<script lang="ts">
	export let message: string
	export let error: string | null = null
</script>

<article class="rounded-lg p-4 bg-red">
	<p class="text-white">
		{message}
		{#if error}
			<br />
			{error}
		{/if}
	</p>
</article>

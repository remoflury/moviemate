<script lang="ts">
	const year = new Date().getFullYear()

	const legalLinks = [
		{
			title: 'Privacy Policy',
			uri: '/privacy-policy'
		},
		{
			title: 'Legal Notice',
			uri: '/legal-notice'
		}
	]
</script>

<footer class="container py-8 flex justify-between items-center">
	<small class="text-xs">© MovieMate {year}</small>

	<div class="flex gap-x-4 justify-center items-center">
		{#each legalLinks as link, index}
			<a class="text-xs" href={link.uri} title={link.title}>{link.title}</a>
			{#if index !== legalLinks.length - 1}
				<span>|</span>
			{/if}
		{/each}
	</div>
</footer>

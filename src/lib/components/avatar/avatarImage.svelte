<script lang="ts">
	export let path: string
	export let alt: string = ''
</script>

<figure class="w-full aspect-square rounded-max overflow-hidden">
	<img class="object-cover object-center w-full h-full" src={path} {alt} />
</figure>

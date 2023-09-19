<script lang="ts">
	export let text: string;
	export let link: string;
	export let openInNewWindow: boolean = false;

	let target: string;
	if (openInNewWindow) {
		target = '_blank';
	}
</script>

<div class="grid place-content-center">
	<a class="btn" href={link} {target} title={text}>{text}</a>
</div>

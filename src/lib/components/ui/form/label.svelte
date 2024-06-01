<script lang="ts">
	export let label: string
	export let name: string
	export let required: boolean = false
	export let hidden: boolean = false
</script>

<label for={name} {hidden}>{label}{required ? ' *' : ''}</label>

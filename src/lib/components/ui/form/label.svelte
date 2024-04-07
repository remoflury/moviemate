<script lang="ts">
	export let label: string
	export let name: string
	export let required: boolean = false
</script>

<label for={name}>{label}{required ? ' *' : ''}</label>

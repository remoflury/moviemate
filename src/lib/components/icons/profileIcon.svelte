<script lang="ts">
	import { activeMenu } from '$lib/stores/menu';
</script>

<svg class="max-w-full" width="36" height="36" viewBox="0 0 36 36">
	<path
		class="{$activeMenu === 'profile' ? 'fill-primary' : 'fill-white'} transition"
		d="M18,0C13.05,0,9,5.04,9,11.25S13.05,22.5,18,22.5s9-5.04,9-11.25S22.95,0,18,0ZM8.6,22.5a9.009,9.009,0,0,0-8.6,9V36H36V31.5a8.978,8.978,0,0,0-8.6-9A12.638,12.638,0,0,1,18,27,12.638,12.638,0,0,1,8.6,22.5Z"
	/>
</svg>

<script lang="ts">
	import { activeMenu, previousPath } from '$lib/stores/menu';

	$activeMenu = 'profile';
	$previousPath.params = '';
</script>

<slot />

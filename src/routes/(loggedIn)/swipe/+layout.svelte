<script lang="ts">
	import { activeMenu, previousPath } from '$lib/stores/menu';

	$activeMenu = 'swipe';
	$previousPath.params = '';
</script>

<slot />

<script lang="ts">
	import { activeMenu, previousPath } from '$lib/stores/menu';
	import BottomNavigation from '$lib/components/navigation/bottomNavigation.svelte';
	import LogoHeader from '$lib/components/logoHeader.svelte';
	$activeMenu = 'profile';
	$previousPath.params = '';
</script>

<slot />
<BottomNavigation />

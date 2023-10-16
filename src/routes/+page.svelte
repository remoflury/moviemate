<script lang="ts">

	import { onMount } from 'svelte';

	let isMobile = true;

	onMount(() => {
		const mq = window.matchMedia('(max-width: 768px)');
		isMobile = mq.matches;
		mq.addListener(e => isMobile = e.matches);
	});

	import { goto } from '$app/navigation';
	import { showSettings } from '$lib/stores/menu';
	$showSettings = false;

	export let data;

	// redirect to swipe page if user is logged in
	$: if (data.session) goto('/swipe');
</script>

<!-- Wie kann ich den oberen Logo Balken ignorieren? -->
{#if isMobile}
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam, rerum.</p>

{:else}
<section class="flex flex-row h-screen w-screen justify-center items-center absolute">
		<svg class="basis-1/4 max-h-20" id="Layer_1" viewBox="0 0 701.13 273.31"
			><defs
				><style>
					.cls-1 {
						font-family: OutfitThin-Regular, 'Outfit Thin';
						font-size: 133.28px;
						font-variation-settings: 'wght' 400;
					}
					.cls-2 {
						fill: none;
						stroke: #469f96;
						stroke-miterlimit: 10;
						stroke-width: 8px;
					}
					.cls-3 {
						letter-spacing: -0.04em;
					}
					.cls-3,
					.cls-4 {
						fill: #fff;
					}
					.cls-4 {
						letter-spacing: -0.03em;
					}
					.cls-5 {
						fill: #46b8af;
						letter-spacing: -0.03em;
					}
				</style></defs
			><text class="cls-1" transform="translate(0 238.92)"
				><tspan class="cls-5" x="0" y="0" xml:space="preserve">Movie </tspan><tspan
					class="cls-4"
					x="380.9"
					y="0">M</tspan
				><tspan class="cls-3" x="488.33" y="0">a</tspan><tspan class="cls-4" x="561.23" y="0"
					>te</tspan
				></text
			><path
				class="cls-2"
				d="m697.13,98.53v138.9c0,17.61-15.65,31.89-34.96,31.89h-262.14c-16.48,0-29.85-12.19-29.85-27.22V101.42l7.25-4.4,6.66-5.82h305c4.44,0,8.03,3.28,8.03,7.33Z"
			/><path
				class="cls-2"
				d="m689.96,30.06c.61,3.34-1.86,8.45-5.51,9.01l-298.73,43.58-2.44.37c-3.66.56-15.06-9.55-15.67-12.89l.23,9.03c-.17-.97-.16-8.07-.23-9.03-1.35-16.27,10.97-24.94,28.95-25.71L654.76,5.06c16.26-4.44,31.63,5.58,34.35,20.4l.85,4.6Z"
			/><ellipse class="cls-2" cx="367.36" cy="88.8" rx="12.41" ry="11.32" /><path
				class="cls-2"
				d="m408.73,40.94c-10.13,14.81-19.27,28.16-27.48,40.16"
			/><path class="cls-2" d="m452.53,37.18c-9.16,13.39-18.32,24.81-27.48,38.19" /><path
				class="cls-2"
				d="m493.75,28.93c-10.13,14.81-20.68,30.18-28.88,42.17"
			/><path class="cls-2" d="m535.12,22.63c-10.13,14.81-21.22,30.53-29.43,42.52" /><path
				class="cls-2"
				d="m580.14,15.76c-10.13,14.81-19.27,28.16-27.48,40.16"
			/><path class="cls-2" d="m580.14,15.76c-10.13,14.81-21.51,30.87-29.72,42.86" /><path
				class="cls-2"
				d="m625.45,8.86c-10.13,14.81-19.27,30.84-27.48,42.83"
			/><path class="cls-2" d="m666.82,2.55c-10.13,14.81-20.22,31.25-28.43,43.24" /><path
				class="cls-2"
				d="m410.88,119.41c-10.34-9.85-20.67-19.7-31.01-29.54"
			/><path class="cls-2" d="m454.29,119.41c-10.34-9.85-20.67-19.7-31.01-29.54" /><path
				class="cls-2"
				d="m502.36,119.41c-10.34-9.85-20.67-19.7-31.01-29.54"
			/><path class="cls-2" d="m548.96,119.41c-10.34-9.85-20.67-19.7-31.01-29.54" /><path
				class="cls-2"
				d="m589.23,119.41c-10.34-9.85-20.67-19.7-31.01-29.54"
			/><path class="cls-2" d="m633.93,119.41c-10.34-9.85-20.67-19.7-31.01-29.54" /><path
				class="cls-2"
				d="m678.64,119.41c-10.34-9.85-20.67-19.7-31.01-29.54"
			/><path class="cls-2" d="m694.19,119.94c-107.08,0-214.16,0-321.23,0" /></svg
		>
	<div class="pl-20 basis-3/4">
		<h1 class="text-5xl">Hi Mate!</h1>
		<p class="text-2xl py-8">Please open this page on a mobile device and download it.</p>
		<p class="text-2xl py-8">You can download the app in the following stores.</p>

		<div class="mt-4 flex gap-x-4">
			<a class="underline" href="/login">Login</a>
			<a class="underline" href="/register">Register</a>
		</div>
	</div>
</section>


<!-- Wie füge ich schon wieder die richtige Farbe zu? -->

<footer class="fixed inset-x-0 bottom-5 text-white py-4"> 
    <div class="container mx-auto justify-between items-center"> 
        <div class="absolute left-10">
           <p>© MovieMate 2023</p>
        </div>
        <div class="absolute right-10">
			<a href="/privacy" class="text-white hover:text-gray-300">Privacy</a>
			<span> | </span>
            <a href="/legalNotice" class="text-white hover:text-gray-300">Legal Notice</a>
        </div>
    </div>
</footer>
{/if}



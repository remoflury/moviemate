<script lang="ts">
	import { showGoBack, previousPath, showSettings } from "$lib/stores/menu";
    import { goto } from "$app/navigation";
    const goBackTo = () => {
        goto($previousPath)
    }
    
</script>

<div class="mx-auto text-center mt-5 flex justify-between gap-x-4 items-center container pb-2">
    <div class="max-w-[2rem]">
        {#if $showGoBack == true}
        <svg on:click={goBackTo} class="max-w-full" id="Layer_1" style="enable-background:new 0 0 512 512;" version="1.1" viewBox="0 0 512 512" width="512px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><polygon class="fill-gray-dark "points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256 "/></svg>
        {/if}
    </div>

    <div class="max-w-[2rem]">
        {#if $showSettings == true}
        <svg xmlns="http://www.w3.org/2000/svg"  class="max-w-full fill-gray-dark" viewBox="0 0 50 50" width="50px" height="50px"  >    <path d="M47.16,21.221l-5.91-0.966c-0.346-1.186-0.819-2.326-1.411-3.405l3.45-4.917c0.279-0.397,0.231-0.938-0.112-1.282 l-3.889-3.887c-0.347-0.346-0.893-0.391-1.291-0.104l-4.843,3.481c-1.089-0.602-2.239-1.08-3.432-1.427l-1.031-5.886 C28.607,2.35,28.192,2,27.706,2h-5.5c-0.49,0-0.908,0.355-0.987,0.839l-0.956,5.854c-1.2,0.345-2.352,0.818-3.437,1.412l-4.83-3.45 c-0.399-0.285-0.942-0.239-1.289,0.106L6.82,10.648c-0.343,0.343-0.391,0.883-0.112,1.28l3.399,4.863 c-0.605,1.095-1.087,2.254-1.438,3.46l-5.831,0.971c-0.482,0.08-0.836,0.498-0.836,0.986v5.5c0,0.485,0.348,0.9,0.825,0.985 l5.831,1.034c0.349,1.203,0.831,2.362,1.438,3.46l-3.441,4.813c-0.284,0.397-0.239,0.942,0.106,1.289l3.888,3.891 c0.343,0.343,0.884,0.391,1.281,0.112l4.87-3.411c1.093,0.601,2.248,1.078,3.445,1.424l0.976,5.861C21.3,47.647,21.717,48,22.206,48 h5.5c0.485,0,0.9-0.348,0.984-0.825l1.045-5.89c1.199-0.353,2.348-0.833,3.43-1.435l4.905,3.441 c0.398,0.281,0.938,0.232,1.282-0.111l3.888-3.891c0.346-0.347,0.391-0.894,0.104-1.292l-3.498-4.857 c0.593-1.08,1.064-2.222,1.407-3.408l5.918-1.039c0.479-0.084,0.827-0.5,0.827-0.985v-5.5C47.999,21.718,47.644,21.3,47.16,21.221z M25,32c-3.866,0-7-3.134-7-7c0-3.866,3.134-7,7-7s7,3.134,7,7C32,28.866,28.866,32,25,32z"/></svg>
        {/if}
    </div>

    <a href="/" class="basis-1/2 flex justify-start">
        <svg class="w-[5rem] -translate-x-1/2" id="Layer_1" viewBox="0 0 701.13 273.31"><defs><style>.cls-1{font-family:OutfitThin-Regular, 'Outfit Thin';font-size:133.28px;font-variation-settings:'wght' 400;}.cls-2{fill:none;stroke:#469f96;stroke-miterlimit:10;stroke-width:8px;}.cls-3{letter-spacing:-.04em;}.cls-3,.cls-4{fill:#fff;}.cls-4{letter-spacing:-.03em;}.cls-5{fill:#46b8af;letter-spacing:-.03em;}</style></defs><text class="cls-1" transform="translate(0 238.92)"><tspan class="cls-5" x="0" y="0" xml:space="preserve">Movie  </tspan><tspan class="cls-4" x="380.9" y="0">M</tspan><tspan class="cls-3" x="488.33" y="0">a</tspan><tspan class="cls-4" x="561.23" y="0">te</tspan></text><path class="cls-2" d="m697.13,98.53v138.9c0,17.61-15.65,31.89-34.96,31.89h-262.14c-16.48,0-29.85-12.19-29.85-27.22V101.42l7.25-4.4,6.66-5.82h305c4.44,0,8.03,3.28,8.03,7.33Z"/><path class="cls-2" d="m689.96,30.06c.61,3.34-1.86,8.45-5.51,9.01l-298.73,43.58-2.44.37c-3.66.56-15.06-9.55-15.67-12.89l.23,9.03c-.17-.97-.16-8.07-.23-9.03-1.35-16.27,10.97-24.94,28.95-25.71L654.76,5.06c16.26-4.44,31.63,5.58,34.35,20.4l.85,4.6Z"/><ellipse class="cls-2" cx="367.36" cy="88.8" rx="12.41" ry="11.32"/><path class="cls-2" d="m408.73,40.94c-10.13,14.81-19.27,28.16-27.48,40.16"/><path class="cls-2" d="m452.53,37.18c-9.16,13.39-18.32,24.81-27.48,38.19"/><path class="cls-2" d="m493.75,28.93c-10.13,14.81-20.68,30.18-28.88,42.17"/><path class="cls-2" d="m535.12,22.63c-10.13,14.81-21.22,30.53-29.43,42.52"/><path class="cls-2" d="m580.14,15.76c-10.13,14.81-19.27,28.16-27.48,40.16"/><path class="cls-2" d="m580.14,15.76c-10.13,14.81-21.51,30.87-29.72,42.86"/><path class="cls-2" d="m625.45,8.86c-10.13,14.81-19.27,30.84-27.48,42.83"/><path class="cls-2" d="m666.82,2.55c-10.13,14.81-20.22,31.25-28.43,43.24"/><path class="cls-2" d="m410.88,119.41c-10.34-9.85-20.67-19.7-31.01-29.54"/><path class="cls-2" d="m454.29,119.41c-10.34-9.85-20.67-19.7-31.01-29.54"/><path class="cls-2" d="m502.36,119.41c-10.34-9.85-20.67-19.7-31.01-29.54"/><path class="cls-2" d="m548.96,119.41c-10.34-9.85-20.67-19.7-31.01-29.54"/><path class="cls-2" d="m589.23,119.41c-10.34-9.85-20.67-19.7-31.01-29.54"/><path class="cls-2" d="m633.93,119.41c-10.34-9.85-20.67-19.7-31.01-29.54"/><path class="cls-2" d="m678.64,119.41c-10.34-9.85-20.67-19.7-31.01-29.54"/><path class="cls-2" d="m694.19,119.94c-107.08,0-214.16,0-321.23,0"/></svg>
    </a>
</div>

<hr class="w-100 border-t border-gray-dark mt-2">
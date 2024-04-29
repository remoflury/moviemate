import { cubicOut } from "svelte/easing";
import type { TransitionConfig } from "svelte/transition";

export const TRANSITION: TransitionConfig = {
  duration: 250,
  easing: cubicOut
}
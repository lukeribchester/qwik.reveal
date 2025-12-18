export function isServer(): boolean {
  return typeof window === "undefined" || typeof document === "undefined";
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined"
    && typeof window.matchMedia === "function"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function supportsScrollDrivenAnimations(): boolean {
  return typeof CSS !== "undefined"
    && typeof CSS.supports === "function"
    && CSS.supports("animation-timeline: view()");
}

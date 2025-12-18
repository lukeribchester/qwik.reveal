import { CLASS_SCREEN } from "../core/selectors";

export function parseThreshold(element: HTMLElement): number {
  const raw: string = getComputedStyle(element).getPropertyValue("--reveal-threshold").trim();
  const threshold: number = Number.parseFloat(raw);

  if (Number.isFinite(threshold)) return Math.min(1, Math.max(0, threshold));

  // Scroll container screens trigger later.
  return element.classList.contains(CLASS_SCREEN) ? 0.6 : 0.25;
}

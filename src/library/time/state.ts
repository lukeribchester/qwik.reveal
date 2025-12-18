import { ATTR_REVEAL_DRIVER, ATTR_REVEAL_STATE } from "../core/selectors";
import type { TimeItem, TimeState } from "../core/types";

export function setState(targets: HTMLElement[], state: TimeState): void {
  for (const target of targets) {
    target.setAttribute(ATTR_REVEAL_DRIVER, "time");
    target.setAttribute(ATTR_REVEAL_STATE, state);
  }
}

export function applyInitialItemState(item: TimeItem, initiallyActive: boolean): void {
  if (initiallyActive) {
    if (item.initialAnimate) {
      // TODO: Hide, then animate on the next frame.
      setState(item.targets, "pending");
      requestAnimationFrame(() => revealItem(item));
    } else {
      // TODO: Show immediately to avoid flash.
      showItem(item);
    }
  } else {
    // TODO: Below fold: hide so it can animate in later
    setState(item.targets, "pending");
  }
}

export function showItem(item: TimeItem): void {
  setState(item.targets, "shown");
  if (!item.repeat) item.done = true;
}

export function revealItem(item: TimeItem): void {
  if (item.done) return;
  setState(item.targets, "revealed");
  if (!item.repeat) item.done = true;
}

export function resetItem(item: TimeItem): void {
  if (!item.repeat) return;
  item.done = false;
  setState(item.targets, "pending");
}

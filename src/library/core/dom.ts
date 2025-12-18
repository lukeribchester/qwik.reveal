import {
  CLASS_REVEAL_GROUP,
  CLASS_REVEAL_SCROLL,
  CLASS_REVEAL_TIME,
  CLASS_TRIGGER_SELF,
  SELECTOR_REVEAL,
  SELECTOR_REVEAL_GROUP,
  SELECTOR_REVEAL_ROOT,
  SELECTOR_SCREEN,
} from "./selectors";
import { Driver, TargetElements } from "./types";

export function getTargetElements(scope: ParentNode): TargetElements {
  const allTargets: HTMLElement[] = Array.from(scope.querySelectorAll<HTMLElement>(SELECTOR_REVEAL));
  const groups: HTMLElement[] = Array.from(scope.querySelectorAll<HTMLElement>(SELECTOR_REVEAL_GROUP));

  // Filter out the group targets to determine the single targets.
  const singles: HTMLElement[] = allTargets.filter((element: HTMLElement) =>
    !(element.parentElement?.classList.contains(CLASS_REVEAL_GROUP)));

  return { singles, groups };
}

export function getDriver(element: HTMLElement, scrollSupported: boolean): Driver {
  if (element.classList.contains(CLASS_REVEAL_TIME)) return "time";

  if (element.classList.contains(CLASS_REVEAL_SCROLL)) {
    return scrollSupported ? "scroll" : "none";
  }

  return scrollSupported ? "scroll" : "time";
}

export function getAnimationRoot(element: HTMLElement): HTMLElement | null {
  return element.closest(SELECTOR_REVEAL_ROOT) as HTMLElement | null;
}

export function getTriggerElement(element: HTMLElement): HTMLElement {
  if (element.classList.contains(CLASS_TRIGGER_SELF)) return element;

  const screen = element.closest(SELECTOR_SCREEN) as HTMLElement | null;
  return screen ?? element;
}

export function getIntersectionRatio(element: HTMLElement, root: HTMLElement | null): number {
  // Root rect is the scrollport rect (or viewport if root is null)
  const r = root
    ? root.getBoundingClientRect()
    : {
      top: 0,
      left: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      width: window.innerWidth,
      height: window.innerHeight,
    };

  const b = element.getBoundingClientRect();

  const iw = Math.max(0, Math.min(b.right, r.right) - Math.max(b.left, r.left));
  const ih = Math.max(0, Math.min(b.bottom, r.bottom) - Math.max(b.top, r.top));

  const area = Math.max(1, b.width * b.height);
  const iArea = iw * ih;

  return Math.min(1, Math.max(0, iArea / area));
}

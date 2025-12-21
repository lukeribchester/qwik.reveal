import { getIntersectionRatio } from "../core/dom";
import type { RevealObserver, TimeItem, TriggerGroup, TriggerPlan } from "../core/types";
import { applyInitialItemState, resetItem, revealItem } from "./state";

const THRESHOLDS = Array.from({ length: 101 }, (_, i) => i / 100);

function initializeTriggerGroup(triggerGroup: TriggerGroup, observer: IntersectionObserver): void {
  const ratio: number = getIntersectionRatio(triggerGroup.trigger, triggerGroup.root);
  const initiallyActive: boolean = ratio >= triggerGroup.threshold;

  triggerGroup.active = initiallyActive;

  for (const item of triggerGroup.items) {
    applyInitialItemState(item, initiallyActive);
  }

  const shouldObserve = triggerGroup.items.some((item: TimeItem) => item.repeat || !item.done);
  if (shouldObserve) observer.observe(triggerGroup.trigger);
}

function activateTriggerGroup(triggerGroup: TriggerGroup, observer: IntersectionObserver): void {
  triggerGroup.active = true;

  for (const item of triggerGroup.items) {
    revealItem(item);
  }

  const hasRepeat: boolean = triggerGroup.items.some((item: TimeItem) => item.repeat);
  const allDone = triggerGroup.items.every((item: TimeItem) => item.done);

  if (!hasRepeat && allDone) {
    observer.unobserve(triggerGroup.trigger);
  }
}

function deactivateTriggerGroup(triggerGroup: TriggerGroup): void {
  triggerGroup.active = false;

  for (const item of triggerGroup.items) {
    resetItem(item);
  }
}


// TODO:
export function startTimeDriver(plan: TriggerPlan): RevealObserver {
  // Empty plan guard.
  if (plan.size === 0) return () => {
  };

  const observers: IntersectionObserver[] = [];

  plan.forEach((triggerGroups, root) => {
    // eslint-disable-next-line prefer-const
    let observer: IntersectionObserver;

    const handleEntries = (entries: IntersectionObserverEntry[]) => {
      for (const entry of entries) {
        const triggerGroup = triggerGroups.get(entry.target as HTMLElement);
        if (!triggerGroup) continue;

        const nowActive = entry.intersectionRatio >= triggerGroup.threshold;

        if (nowActive && !triggerGroup.active) {
          activateTriggerGroup(triggerGroup, observer);
        } else if (!nowActive && triggerGroup.active) {
          deactivateTriggerGroup(triggerGroup);
        }
      }
    };

    observer = new IntersectionObserver(handleEntries, {
      root,
      threshold: THRESHOLDS,
    });

    observers.push(observer);

    triggerGroups.forEach((triggerGroup: TriggerGroup) => initializeTriggerGroup(triggerGroup, observer));
  });

  return (): void => {
    for (const observer of observers) observer.disconnect();
  };
}





import { getAnimationRoot, getDriver, getTriggerElement } from "../core/dom";
import { CLASS_REVEAL_INITIAL_ANIMATE, CLASS_REVEAL_REPEAT } from "../core/selectors";
import type { Driver, TimeItem, TriggerGroup, TriggerPlan } from "../core/types";
import { getChildTargets } from "../stagger";
import { parseThreshold } from "./config";

type BuildTimePlanArgs = {
  groups: HTMLElement[];
  singles: HTMLElement[];
  scrollSupported: boolean;
};

export function buildPlan({ groups, singles, scrollSupported }: BuildTimePlanArgs): TriggerPlan {
  const plan: TriggerPlan = new Map();

  buildSinglePlans(plan, singles, scrollSupported);
  buildGroupPlans(plan, groups, scrollSupported);

  return plan;
}

function buildSinglePlans(plan: TriggerPlan, singles: HTMLElement[], scrollSupported: boolean): void {
  for (const single of singles) {
    const driver: Driver = getDriver(single, scrollSupported);

    // Time-driven animations guard.
    if (driver !== "time") continue;

    const trigger: HTMLElement = getTriggerElement(single);
    const root: HTMLElement | null = getAnimationRoot(trigger) ?? getAnimationRoot(single);

    const triggerGroup: TriggerGroup = getOrCreateTriggerGroup(plan, trigger, root);
    const targetCollection: TimeItem = createTargetCollection(single, [single]);

    triggerGroup.items.push(targetCollection);
  }
}

function buildGroupPlans(plan: TriggerPlan, groups: HTMLElement[], scrollSupported: boolean): void {
  for (const group of groups) {
    const driver: Driver = getDriver(group, scrollSupported);

    // Time-driven animations guard.
    if (driver !== "time") continue;

    const targets: HTMLElement[] = getChildTargets(group);

    // Empty group guard.
    if (targets.length === 0) continue;

    const trigger: HTMLElement = getTriggerElement(group);
    const root: HTMLElement | null = getAnimationRoot(trigger) ?? getAnimationRoot(group);

    const triggerGroup: TriggerGroup = getOrCreateTriggerGroup(plan, trigger, root);
    const targetCollection: TimeItem = createTargetCollection(group, targets);

    triggerGroup.items.push(targetCollection);
  }
}

function getOrCreateTriggerGroup(triggerPlan: TriggerPlan, trigger: HTMLElement, root: HTMLElement | null): TriggerGroup {
  let triggerGroups = triggerPlan.get(root);

  if (!triggerGroups) {
    triggerGroups = new Map();
    triggerPlan.set(root, triggerGroups);
  }

  let triggerGroup = triggerGroups.get(trigger);
  if (triggerGroup) return triggerGroup;

  triggerGroup = {
    trigger,
    root,
    threshold: parseThreshold(trigger),
    active: false,
    items: [],
  };

  triggerGroups.set(trigger, triggerGroup);
  return triggerGroup;
}

function createTargetCollection(host: HTMLElement, targets: HTMLElement[]): TimeItem {
  return {
    targets,
    repeat: host.classList.contains(CLASS_REVEAL_REPEAT),
    initialAnimate: host.classList.contains(CLASS_REVEAL_INITIAL_ANIMATE),
    done: false,
  };
}

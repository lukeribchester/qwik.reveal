import { indexStaggerGroups } from "../stagger";
import { buildPlan } from "../time";
import { startTimeDriver } from "../time/observer";
import { getTargetElements } from "./dom";
import { isServer, prefersReducedMotion, supportsScrollDrivenAnimations } from "./environment";
import type { RevealObserver, TriggerPlan } from "./types";

export function reveal(scope: ParentNode = document): RevealObserver {
  // Server-side rendering guard.
  if (isServer()) return (): void => {
  };

  // Reduced motion guard.
  if (prefersReducedMotion()) return () => {
  };

  // Scroll-driven animation support check.
  const scrollSupported = supportsScrollDrivenAnimations();

  // Get the single and group animation targets.
  const { singles, groups } = getTargetElements(scope);

  // Index (i.e. add metadata to) the stagger group targets.
  indexStaggerGroups(groups);

  // Build the trigger plan for time-driven animations.
  const triggerPlan: TriggerPlan = buildPlan({ groups, singles, scrollSupported });

  // TODO: Execute the trigger plan.
  return startTimeDriver(triggerPlan);
}

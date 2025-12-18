import { CLASS_REVEAL_IGNORE, CLASS_REVEAL_STAGGER } from "../core/selectors";

export function indexStaggerGroups(groups: HTMLElement[]): void {
  for (const group of groups) indexStaggerGroup(group);
}

export function indexStaggerGroup(group: HTMLElement): void {
  if (!group.classList.contains(CLASS_REVEAL_STAGGER)) return;

  const targets: HTMLElement[] = getChildTargets(group);
  const count: number = targets.length;
  const last: number = Math.max(1, count - 1);

  // Set the group metadata.
  group.style.setProperty("--reveal-stagger-count", String(count));
  group.style.setProperty("--reveal-stagger-last", String(last));

  // Set the child metadata.
  targets.forEach((element: HTMLElement, index: number): void => {
    element.style.setProperty("--reveal-i", String(index));
  });
}

export function getChildTargets(group: HTMLElement): HTMLElement[] {
  const children = Array.from(group.children) as HTMLElement[];
  return children.filter((element: HTMLElement): boolean => !element.classList.contains(CLASS_REVEAL_IGNORE));
}

export type RevealObserver = () => void;

export type Driver = "scroll" | "time" | "none";
export type TimeState = "pending" | "revealed" | "shown";

export type TriggerGroup = {
  trigger: HTMLElement;
  root: HTMLElement | null;
  threshold: number;
  active: boolean;
  items: TimeItem[];
};

export type TimeItem = {
  targets: HTMLElement[];
  repeat: boolean;
  initialAnimate: boolean;
  done: boolean;
};

export type TriggerPlan = Map<HTMLElement | null, Map<HTMLElement, TriggerGroup>>;

export type TargetElements = {
  singles: HTMLElement[];
  groups: HTMLElement[];
};

import { component$, useStyles$, useVisibleTask$ } from "@builder.io/qwik";
import { reveal } from "./core/init";

import styles from "./reveal.css?inline";

export const RevealObserver = component$(() => {
  useStyles$(styles);

  // const location = useLocation();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ cleanup }) => {
    // Re-initialise on client-side navigation.
    // track(() => location.url.pathname + location.url.search + location.url.hash);

    const r = reveal();
    cleanup(r);
  });

  // Render a tiny “sentinel” so the task runs ASAP (intersection-observer strategy)
  return (
    <span
      aria-hidden="true"
      style="position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;"
    />
  );
});

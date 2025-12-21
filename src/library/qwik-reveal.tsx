import { component$, useStyles$, useVisibleTask$ } from "@builder.io/qwik";
import { RouteLocation, useLocation } from "@builder.io/qwik-city";

import { reveal } from "./core/init";
import { RevealObserver } from "./core/types";
import styles from "./reveal.css?inline";

export const QwikReveal = component$(() => {
  useStyles$(styles);

  const location: RouteLocation = useLocation();

  // eslint-disable-next-line qwik/no-use-visible-task
  useVisibleTask$(({ track, cleanup }) => {
    // Initialise on client-side navigation.
    track(() => location.isNavigating);
    track(() => location.url.pathname);
    track(() => location.url.search);
    // track(() => location.url.hash);

    // Prevent initialisation during navigation.
    if (location.isNavigating) return;

    const revealObserver: RevealObserver = reveal();
    cleanup(revealObserver);
  }, {
    // Initialise eagerly.
    strategy: "document-ready",
  });

  return (
    <span
      data-reveal-observer
      aria-hidden="true"
      style="position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;pointer-events:none;"
    />
  );
});

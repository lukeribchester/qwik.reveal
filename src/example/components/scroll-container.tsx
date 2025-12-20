import { component$, Slot } from "@builder.io/qwik";

export const ScrollContainer = component$(() => {
  return (
    <main data-reveal-root
          class="w-full h-screen supports-[height:100svh]:h-svh overflow-y-auto snap-y snap-mandatory scroll-smooth">
      <Slot/>
    </main>
  );
});

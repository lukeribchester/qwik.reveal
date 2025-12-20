import { component$, Slot } from "@builder.io/qwik";

export const Screen = component$(() => {
  return (
    <section
      class="reveal-screen relative w-full h-full snap-center flex flex-col items-center justify-center gap-8 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <Slot/>
    </section>
  );
});

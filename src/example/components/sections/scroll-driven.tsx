import { component$ } from "@builder.io/qwik";

export const ScrollDriven = component$(() => {
  return (
    <div id="scroll-driven" class="reveal-group reveal-stagger">
      <h2>
        <span class="text-(--color-blue) block">Scroll-driven</span> animations
      </h2>

      <ul class="reveal-group reveal-stagger">
        <li>Animates using a scroll-based timeline</li>
        <li>Supported by 78% of browsers</li>
        <li>Falls back graciously</li>
      </ul>
    </div>
  );
});

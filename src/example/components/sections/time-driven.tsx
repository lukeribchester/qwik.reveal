import { component$ } from "@builder.io/qwik";

export const TimeDriven = component$(() => {
  return (
    <div id="time-driven" class="reveal-group reveal-stagger reveal-repeat reveal--time">
      <h2>
        <span class="text-(--color-purple) block">Time-driven</span> animations
      </h2>

      <ul class="reveal-group reveal-stagger reveal-repeat reveal--time">
        <li>Animates using a classic timeline</li>
        <li>Supported by 96% of browsers</li>
        <li>Play once or repeat</li>
      </ul>
    </div>
  );
});

import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

import { RevealObserver } from "../../library/reveal-observer";
import { Screen } from "../components/screen";
import { ScrollContainer } from "../components/scroll-container";
import { Hero } from "../components/sections/hero";
import { ScrollDriven } from "../components/sections/scroll-driven";
import { TimeDriven } from "../components/sections/time-driven";


export default component$(() => {
  return (
    <>
      <RevealObserver/>
      <ScrollContainer>
        <Screen>
          <Hero/>
        </Screen>

        <Screen>
          <ScrollDriven/>
        </Screen>

        <Screen>
          <TimeDriven/>
        </Screen>
      </ScrollContainer>
    </>
  );
});

export const head: DocumentHead = {
  title: "Qwik Reveal - @lgr.dev/qwik-reveal",
  meta: [
    {
      name: "description",
      content: "Modern scroll animations for Qwik applications",
    },
  ],
};

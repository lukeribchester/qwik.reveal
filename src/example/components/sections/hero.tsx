import { $, component$, Signal, useSignal } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

import Logo from "../../media/logo.svg?jsx";

export const Hero = component$(() => {
  const copied: Signal<boolean> = useSignal(false);
  const copyNonce: Signal<number> = useSignal(0);
  const command: string = "npm install @lgr.dev/qwik-reveal";

  const copyCommand$ = $(async () => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      // Fallback for older browsers.
      const textarea: HTMLTextAreaElement = document.createElement("textarea");
      textarea.value = command;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    copied.value = true;
    copyNonce.value = copyNonce.value + 1;
    const nonce: number = copyNonce.value;

    setTimeout(() => {
      if (copyNonce.value === nonce) copied.value = false;
    }, 3000);
  });

  return (
    <div id="top"
         class="flex flex-col text-center items-center justify-between gap-8 sm:gap-16 max-w-[900px] w-9/12 sm:w-9/12 md:w-10/12 lg:w-10/12 reveal-group reveal-stagger reveal--time">


      <header class="flex flex-col items-center justify-center gap-4">
        <Logo class="w-5/6 max-w-xs"/>
        <h1>qwik-reveal</h1>
      </header>

      <div class="flex flex-col items-center justify-center gap-4 sm:gap-8">
        <p>
          Modern <span class="text-(--color-blue)">scroll animations</span> for Qwik applications
        </p>

        <ul class="reveal-group reveal-stagger reveal--time space-y-2">
          <li>Built using modern Web standards</li>
          <li>Use via CSS utility classes</li>
          <li>Customise using design tokens</li>
        </ul>
      </div>

      <div class="flex flex-row items-center justify-center gap-8">
        <button
          onClick$={copyCommand$}
          class="bg-(--color-purple) font-mono"
        >
          {copied.value ? "Copied to clipboard! ⚡️" : command}
        </button>

        <Link
          class="bg-(--color-blue) block"
          href="https://github.com/lukeribchester/qwik.reveal"
          target="_blank"
          rel="noopener"
          aria-label="Qwik Reveal on GitHub"
        >
          View on GitHub
        </Link>
      </div>

    </div>
  );
});

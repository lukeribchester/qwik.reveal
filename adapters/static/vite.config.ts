import { staticAdapter } from "@builder.io/qwik-city/adapters/static/vite";
import { extendConfig } from "@builder.io/qwik-city/vite";

import pagesConfig from "../../vite.example.config";

export default extendConfig(pagesConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ["@qwik-city-plan"],
      },
    },
    plugins: [
      staticAdapter({
        origin: "https://qwik-reveal.lgr.dev",
      }),
    ],
  };
});

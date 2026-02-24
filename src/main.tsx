import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme.ts";
import { SiteDataProvider } from "./context/site-data-context.tsx";
import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <SiteDataProvider>
        <App />
      </SiteDataProvider>
    </MantineProvider>
  </StrictMode>,
);

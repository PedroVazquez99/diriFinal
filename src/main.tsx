import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { buildProvidersTree } from "./services/providers.tsx";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.tsx";

import { LanguageProvider } from "./providers/LanguageProvider";

const AppProvider = buildProvidersTree([
  [LanguageProvider],
  [BrowserRouter],
  [AuthProvider],
  // [Provider, { store }],
  //[ConfigProvider, { theme: globalStyles }],
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);

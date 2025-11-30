import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

async function enableMocking() {
  const { worker } = await import("./mocks/setupWorker.browser.ts");

  // service worker is at the /msw-hidden-timeout/ path when deployed to GitHub Pages
  return worker.start({
    serviceWorker: {
      url: "/msw-hidden-timeout/mockServiceWorker.js",
    },
  });
}

function setupListeners() {
  document.addEventListener("visibilitychange", () => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(
      `[${timestamp}] ⚡️ Document visibility changed: ${
        document.visibilityState
      } ${document.hidden ? "🙈" : "👀"}`
    );
  });

  navigator.serviceWorker.controller?.addEventListener(
    "statechange",
    (event) => {
      const timestamp = new Date().toLocaleTimeString();
      console.log(
        `[${timestamp}] ⚡️ Service Worker state changed: ${
          (event.target as ServiceWorker).state
        }`
      );
    }
  );

  navigator.serviceWorker.addEventListener("controllerchange", () => {
    const timestamp = new Date().toLocaleTimeString();
    console.log(
      `[${timestamp}] ⚡️ Service Worker controller changed: ${navigator.serviceWorker.controller?.state}`
    );
  });
}

function renderApp() {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

enableMocking()
  .then(setupListeners)
  .then(() => renderApp());

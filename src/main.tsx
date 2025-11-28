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

function renderApp() {
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

enableMocking().then(() => renderApp());

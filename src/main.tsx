import React from "react";
import ReactDom from "react-dom/client";
import App from "@/App";
import "@/index.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}
ReactDom.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

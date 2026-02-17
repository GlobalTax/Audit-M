import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Global error handlers to prevent blank screens
window.addEventListener("error", (event) => {
  console.error("Global error caught:", event.error || event.message);
});

window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
  event.preventDefault();
});

try {
  const root = document.getElementById("root");
  if (root) {
    createRoot(root).render(<App />);
  }
} catch (error) {
  console.error("Failed to render app:", error);
  const root = document.getElementById("root");
  if (root) {
    root.innerHTML = '<div style="padding:2rem;color:red;">Error loading application. Please refresh.</div>';
  }
}

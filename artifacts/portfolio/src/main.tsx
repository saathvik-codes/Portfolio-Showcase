import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { loadContent } from "./data/loadContent";

// Render once live content has loaded (or failed); the intro animation covers the wait.
loadContent().finally(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});

import { StrictMode } from "react"; 
import { createRoot } from "react-dom/client";
import App from "./App";
import "./App.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error("No element with id 'root' found in the HTML.");
}
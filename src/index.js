import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // This is correct if your structure is as shown

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
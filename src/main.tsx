import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ChildrenGames } from "./ChildrenGames";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChildrenGames />
  </StrictMode>,
);

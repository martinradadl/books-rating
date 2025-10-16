import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Book } from "./pages/book.tsx";
import { Header } from "./components/header.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />
    <Book />
  </StrictMode>
);

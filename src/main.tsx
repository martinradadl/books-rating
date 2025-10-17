import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Book } from "./pages/book.tsx";
import { Header } from "./components/header.tsx";
import { Footer } from "./components/footer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />
    <Book />
    <Footer />
  </StrictMode>
);

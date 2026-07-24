import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer.tsx";
import { MainRouter } from "./pages/main-router.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex flex-1 flex-col">
            <MainRouter />
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FavouritesProvider } from "./context/FavouritesContext.jsx";
import { WatchlistProvider } from "./context/WatchlistContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FavouritesProvider>
        <WatchlistProvider>
          <App />
        </WatchlistProvider>
      </FavouritesProvider>
    </BrowserRouter>
  </StrictMode>,
);

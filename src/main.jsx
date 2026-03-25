import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { FavouritesProvider } from "../src/context/FavouritesContext.jsx";
import { WatchlistProvider } from "../src/context/WatchlistContext.jsx";
import DreamTeamProvider from "../src/context/DreamTeamContext.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FavouritesProvider>
        <WatchlistProvider>
          <DreamTeamProvider>
            <App />
          </DreamTeamProvider>
        </WatchlistProvider>
      </FavouritesProvider>
    </BrowserRouter>
  </StrictMode>,
);

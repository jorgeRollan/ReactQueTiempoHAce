import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import { Provider } from "./provider.tsx";
import "./styles/globals.css";
import {MainContext} from "./context/Contexts";

function Root() {
  const [theme, setTheme] = useState("light");

  // Use effect para actualizar el tema en toda la app
  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
      <BrowserRouter>
        <Provider>
          <MainContext.Provider value={{theme,setTheme}}>
          <App />
          </MainContext.Provider>
        </Provider>
      </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<Root />);

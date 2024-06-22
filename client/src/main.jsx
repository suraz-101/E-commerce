import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import "./index.css";
import { newStore, store } from "./store/index.js";
import { ToggleContextProvider } from "./context/ToggleContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={newStore}>
        <ToggleContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ToggleContextProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

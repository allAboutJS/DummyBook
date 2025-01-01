import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <Toaster richColors position="top-right" />
            <App />
        </Provider>
    </React.StrictMode>
);

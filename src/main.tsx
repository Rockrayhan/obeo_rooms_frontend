import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import { RouterProvider } from 'react-router'
import { Provider } from "react-redux";
import { store } from "./Redux/store.ts";
import router from "./routes/index.tsx";
import { Toaster } from "./components/ui/sonner.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
       <Toaster richColors/>
    </Provider>
  </StrictMode>
);

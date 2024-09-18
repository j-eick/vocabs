import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import AllVocabs from "./pages/allVocabs.tsx";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./global.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/allVocabs",
    element: <AllVocabs />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

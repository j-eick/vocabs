import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AllVocabs from "./pages/allVocabs.tsx";
import StudySession from "./pages/studySession.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/study",
    element: <StudySession />,
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

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import AllVocabs from "./pages/allVocabs.tsx";
import StudySession from "./pages/studySession.tsx";
import Layout from "./components/ui/Layout.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
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
        ],
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);

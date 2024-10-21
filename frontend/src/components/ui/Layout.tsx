import { Outlet, useLocation } from "react-router-dom";
import Nav from "./Nav";

export default function Layout() {
    const { pathname } = useLocation();

    return (
        <div className="h-screen flex flex-col">
            <main className="flex-grow">
                <Outlet />
            </main>
            <footer className={`h-11 bg-slate-500`}>
                {pathname === "/" && <StartPage />}
                {pathname === "/study" && <StudyPage />}
                {pathname === "/allVocabs" && <AllVocabsPage />}
            </footer>
        </div>
    );

    function StartPage() {
        return (
            <Nav
                navItems={[
                    { path: "/", name: "Dashboard", active: true },
                    { path: "/study", name: "Session", active: false },
                    { path: "/allVocabs", name: "Collection", active: false },
                ]}
            />
        );
    }

    function StudyPage() {
        return (
            <Nav
                navItems={[
                    { path: "/", name: "Dashboard", active: false },
                    { path: "/study", name: "Session", active: true },
                    { path: "/allVocabs", name: "Collection", active: false },
                ]}
            />
        );
    }

    function AllVocabsPage() {
        return (
            <Nav
                navItems={[
                    { path: "/", name: "Dashboard", active: false },
                    { path: "/study", name: "Session", active: false },
                    { path: "/allVocabs", name: "Collection", active: true },
                ]}
            />
        );
    }
}

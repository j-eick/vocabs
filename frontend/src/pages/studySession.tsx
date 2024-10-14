import { useLocation } from "react-router";
import CardCaroussel from "../components/ui/cardCaroussel/CardCaroussel";
import useFlashcardsStore from "../store/flashcardStore";
import { useEffect } from "react";
import Nav from "../components/ui/Nav";

export default function StudySession() {
    const allFlashcards = useFlashcardsStore(state => state.allFlashcards);
    const path = useLocation();

    useEffect(() => {
        console.log(path);
    });

    return (
        <main className="w-screen h-screen ">
            <div className="w-5/6 mx-auto mt-20">
                <CardCaroussel flashcards={allFlashcards} />
            </div>
            <Nav
                navItems={[
                    { path: "/", name: "Dashboard", active: false },
                    { path: "/study", name: "Session", active: true },
                    { path: "/allVocabs", name: "Collection", active: false },
                ]}
            />
        </main>
    );
}

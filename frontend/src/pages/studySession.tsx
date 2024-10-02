import CardCaroussel from "../components/ui/cardCaroussel/CardCaroussel";
import Header from "../components/ui/header/Header";
import useFlashcardsStore from "../store/flashcardStore";

export default function StudySession() {
  const allFlashcards = useFlashcardsStore((state) => state.allFlashcards);

  return (
    <main className="w-dvw h-screen border-4 border-slate-400">
      <Header />
      <div className="w-5/6 mx-auto mt-20">
        <CardCaroussel flashcards={allFlashcards} />
      </div>
    </main>
  );
}

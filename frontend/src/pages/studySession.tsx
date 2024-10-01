import CardCaroussel from "../components/ui/cardCaroussel/CardCaroussel";
import Header from "../components/ui/header/Header";
import useFlashcardsStore from "../store/flashcardStore";

export default function StudySession() {
  const allFlashcards = useFlashcardsStore((state) => state.allFlashcards);

  return (
    <main className="w-dvw h-screen">
      <Header />
      <div className="w-5/6 mx-auto my-0">
        <CardCaroussel flashcards={allFlashcards} />
      </div>
    </main>
  );
}

import { NavLink } from "react-router-dom";
import useFlashcardsStore from "../store/flashcardStore";
import { useEffect } from "react";
import ListItem from "../components/ui/list-item-allVocabs/ListItem";
import useFetchData from "../hooks/useFetchData";
import Header from "../components/ui/header/header";

export default function AllVocabsPage() {
  const allFlashcards = useFlashcardsStore((state) => state.allFlashcards);
  const [isLoading] = useFetchData();

  useEffect(() => {
    if (allFlashcards) {
      console.log(allFlashcards);
    }
  }, []);
  return (
    <main className="w-dvw h-screen">
      <Header />
      <div className="w-5/6 mx-auto my-0">
        <h1>AllVocabs</h1>
        {isLoading && <p>is loading...</p>}
        <ul role="list" className="grid gap-3">
          {allFlashcards.length >= 1 ? (
            allFlashcards.map((card) => <ListItem key={card._id} flashcard={card} />)
          ) : (
            <p>Could nto retrieve your list of vocabularies.</p>
          )}
        </ul>
      </div>
    </main>
  );
}

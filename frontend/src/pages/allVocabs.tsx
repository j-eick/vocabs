import { NavLink } from "react-router-dom";
import useFlashcardsStore from "../store/flashcardStore";
import { useEffect } from "react";

export default function AllVocabsPage() {
  const allFlashcards = useFlashcardsStore((state) => state.allFlashcards);

  useEffect(() => {
    if (allFlashcards) {
      console.log(allFlashcards);
    }
  }, []);
  return (
    <>
      <NavLink to="/">go back</NavLink>
      <h1>AllVocabs</h1>
      <ul>
        {allFlashcards.map((card) => (
          <li key={card._id}>yo!</li>
        ))}
      </ul>
    </>
  );
}

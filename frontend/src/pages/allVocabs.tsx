import useFlashcardsStore from "../store/flashcardStore";
import { useEffect } from "react";
import ListItem from "../components/ui/list-item-allVocabs/ListItem";
import useFetchData from "../hooks/useFetchData";
import Header from "../components/ui/header/Header";

export default function AllVocabsPage() {
  const allFlashcards = useFlashcardsStore((state) => state.allFlashcards);
  const [isLoading] = useFetchData();

  useEffect(() => {
    if (allFlashcards) {
      console.log(allFlashcards);
    }
  });

  return (
    <main className="relative w-full min-h-dvh border-4 border-slate-400">
      <Header />

      {isLoading && <p>is loading...</p>}
      <ul role="list" className="w-5/6 mx-auto mt-8 mb-24">
        {allFlashcards.length >= 1 ? (
          allFlashcards.map((card) => <ListItem key={card._id} flashcard={card} />)
        ) : (
          <>
            <p className="mb-10">
              You don't have one single flashcard yet. Work up! <br /> <br /> Head over to Dashboard and create your
              first flashcard.
            </p>
          </>
        )}
      </ul>
      {/* 
      <button
        className={`fixed bottom-6 left-1/2 -translate-x-1/2
                    w-3/5 h-10 mx-auto
                    grid place-items-center
                    bg-slate-300 border-2 rounded-3xl`}
      >
        edit
      </button> */}
    </main>
  );
}

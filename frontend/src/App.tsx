import "./App.css";
import { useState } from "react";
import useFlashcardsStore from "./store/flashcardStore";
import Header from "./components/ui/header/Header";
import { FlashcardProp } from "./types/flashcard";
import FormModal_blurredBg from "./components/ui/modal/Form_ModalblurredBg";

export default function App() {
  const allFlashcards = useFlashcardsStore((state) => state.allFlashcards);
  const [showDialog, setShowDialog] = useState(false);

  return (
    <main className="relative w-screen h-screen">
      <Header />
      <FormModal_blurredBg show={showDialog} onClickOutside={() => setShowDialog(false)} />
      {/* DASHBOARD ITEMS */}
      <section className="relative w-5/6 mx-auto my-0 mt-5">
        <LatestVocab flashcards={allFlashcards} />
      </section>

      {/* <section className="relative w-5/6 mx-auto my-0 border-2">
        
      </section> */}
    </main>
  );

  type LatestVocabProps = {
    flashcards: FlashcardProp[];
  };
  //TODO: turn this into a caroussel.
  function LatestVocab({ flashcards }: LatestVocabProps) {
    // grabbing last 3 indexes of allFlashcard-array
    const lastThreeEntries = flashcards.slice(flashcards.length - 3, flashcards.length);

    return (
      <div className="mx-auto my-0 text-left border-2">
        <p>last 3 entries</p>
        <ul role="list" className="border border-slate-600">
          {lastThreeEntries.map((entry) => (
            <li key={entry._id}>{entry.front_title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

import useFlashcardsStore from "./store/flashcardStore";
import Header from "./components/ui/header/Header";
import { FlashcardProp } from "./types/flashcard";
import FormModal_blurredBg from "./components/ui/modal/Form_ModalblurredBg";
import useButtonStore from "./store/buttonStore";
import useModalStore from "./store/modalStore";
import { useEffect } from "react";

export default function App() {
  const allFlashcards = useFlashcardsStore((state) => state.allFlashcards);
  const newVocabButton = useButtonStore((state) => state);
  const State_ModalNewVocabForm = useModalStore((state) => state.NewVocabFormModal_State);
  const showDialogModal = useModalStore((state) => state.ShowNewVocabModal);
  const allStacksWithCards = useFlashcardsStore((state) => state.allStacksWithCards);

  useEffect(() => {
    console.log(allStacksWithCards);
  });

  return (
    <main className="relative w-screen h-screen">
      <Header />
      {/* DASHBOARD ITEMS */}
      <section className="relative w-5/6 mx-auto my-0 mt-5">
        <LatestVocab flashcards={allFlashcards} />
      </section>
      {allStacksWithCards && (
        <ul>
          {allStacksWithCards.map((stack, i) => (
            <li key={i} className="border-2">
              <p>{stack.name}</p>
              <p>{`Number of flashcards: ${stack.flashcards.length}`}</p>
            </li>
          ))}
        </ul>
      )}
      <FormModal_blurredBg show={State_ModalNewVocabForm} onClickOutside={() => showDialogModal(false)} />
      {/* BUTTON: CREATE NEW VOCAB */}
      {newVocabButton.NewVocabButton_State && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            showDialogModal(true);
            newVocabButton.ShowNewVocabButton(false);
          }}
          className={`fixed w-5/6 p-3 bottom-6 -translate-x-1/2
										border-2 rounded-md`}
        >
          Add Vocab
        </button>
      )}
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

import { useState } from "react";
import { FlashcardProp } from "../../../types/flashcard";
import { FaCaretRight } from "react-icons/fa6";

type CardCarousselProps = {
  flashcards: FlashcardProp[];
};

export default function CardCaroussel({ flashcards }: CardCarousselProps) {
  const [index, setIndex] = useState<number>(0);
  const [back, setBack] = useState(false);

  if (!flashcards || !flashcards.length) {
    return <p>Flashcard couldn't be retrieved.</p>;
  }
  const { front_title, front_text, back_title, back_text, createdAt, updatedAt } = flashcards[index];

  function handleSkipClick() {
    setIndex((prev) => (prev + 1) % flashcards.length);
  }

  function handleShowClick() {
    setBack(!back);
  }

  // INFO: Flashcard Variants: (1) Space only for question (2) Indicates length of answer
  return (
    <>
      {!flashcards.length || !flashcards ? (
        "Flashcard could not be retrieved."
      ) : (
        <>
          <div
            className={`min-h-20 py-3 mb-10
                      shadow-line rounded-lg`}
          >
            <h1>{front_title}</h1>
            <p>{front_text}</p>
          </div>
          {back && (
            <div
              className={`min-h-20 py-3 mb-10
                      shadow-line rounded-lg`}
            >
              <>
                <h1>{back_title}</h1>
                <p>{back_text}</p>
              </>
            </div>
          )}
          <div className="w-4/5 flex justify-evenly gap-5 mx-auto">
            {!back ? (
              <button className="w-20 p-2 rounded-2xl border-2" onClick={handleShowClick}>
                show
              </button>
            ) : (
              <button
                className="w-20 p-2 rounded-2xl border-2"
                onClick={() => {
                  handleSkipClick();
                  setBack(false);
                }}
              >
                next
              </button>
            )}
            <button className={`w-20 p-2 flex items-center gap-2 rounded-2xl border-2`} onClick={handleSkipClick}>
              Skip
              <FaCaretRight />
            </button>
          </div>
        </>
      )}
    </>
  );
}

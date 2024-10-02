import { useState } from "react";
import { FlashcardProp } from "../../../types/flashcard";

type CardCarousselProps = {
  flashcards: FlashcardProp[];
};

export default function CardCaroussel({ flashcards }: CardCarousselProps) {
  const [index, setIndex] = useState<number>(0);
  if (!flashcards || !flashcards.length) {
    return <p>Flashcard couldn't be retrieved.</p>;
  }
  const { front_title, front_text, back_title, back_text, createdAt, updatedAt } = flashcards[index];

  function handleClick() {
    setIndex((prev) => (prev + 1) % flashcards.length);
  }

  // INFO: Flashcard Variants: (1) Space only for question (2) Indicates length of answer
  return (
    <>
      {!flashcards.length || !flashcards ? (
        "Flashcard could not be retrieved."
      ) : (
        <div
          className={`min-h-40 py-3
                      shadow-line rounded-lg`}
        >
          <h1>{front_title}</h1>
          <p>{front_text}</p>
          <h1>{back_title}</h1>
          <p>{back_text}</p>
          <button onClick={handleClick} className="border-2 w-full">
            next card
          </button>
        </div>
      )}
    </>
  );
}

import { useState } from "react";
import { FlashcardProp } from "../../types/flashcard";

type CardCarousselProps = {
  flashcards: FlashcardProp[];
};

export default function CardCaroussel({ flashcards }: CardCarousselProps) {
  const [index, setIndex] = useState<number>(0);
  if (!flashcards || !flashcards.length) {
    return <p>Flashcard couldn't be retrieved.</p>;
  }
  const { front_title, front_text, back_title, back_text } = flashcards[index];

  function handleClick() {
    setIndex((prev) => (prev + 1) % flashcards.length);
  }

  return (
    <>
      {!flashcards.length || !flashcards ? (
        "Flashcard could not be retrieved."
      ) : (
        <div className="bg-slate-300">
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

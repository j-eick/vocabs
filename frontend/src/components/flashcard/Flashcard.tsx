import { FlashcardProp } from "../../types/flashcard";

export function Flashcard({ flashcard }: { flashcard: FlashcardProp }) {
  const { _id, front_title, front_text, back_title, back_text, createdAt, updatedAt } = flashcard;

  return (
    <div>
      <h1>{front_title}</h1>
      <p>{front_text}</p>
      <h1>{back_title}</h1>
      <p>{back_text}</p>
    </div>
  );
}

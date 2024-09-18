import { FlashcardProp } from "../types/flashcard";

export const fetchFlashcards = async (): Promise<FlashcardProp[]> => {
  const res = await fetch("/api/vocabs", {
    method: "GET",
  });

  if (!res.ok) {
    throw Error(`Error while fetching flashcards: ${res}`);
  }
  const result = await res.json();
  console.log(result);

  return result;
};

import { FlashcardProp } from "../types/flashcard";

export const fetchFlashcards = async (): Promise<FlashcardProp[]> => {
  const res = await fetch("/api/vocabs", {
    method: "GET",
  });

  if (!res.ok) {
    throw Error(`Error while fetching flashcards from DB: ${res}`);
  }
  const result = await res.json();

  return result;
};

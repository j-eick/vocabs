import { FlashcardProp } from "./flashcard";

export type StackProp = {
  _id: string;
  name: string;
  description: string;
  flashcards: [];
  createdAt: string;
  updatedAt: string;
};

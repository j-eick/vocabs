import { FlashcardProp } from "./flashcard";

export type StackProp = {
    _id: string;
    name: string;
    description: string;
    flashcards: FlashcardProp[];
    createdAt: string;
    updatedAt: string;
};

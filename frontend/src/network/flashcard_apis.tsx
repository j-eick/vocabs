import { FlashcardProp } from "../types/flashcard";
import { NewFlashcard } from "../components/ui/form/CreateNewVocab";

/**
 * GET ALL CARDS
 * @returns updated JSON
 */
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

/**
 * CREATE CARD
 * @returns updated JSON
 */
export const createFlashcard = async (newFlashcard: NewFlashcard): Promise<FlashcardProp> => {
    const res = await fetch("/api/vocabs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newFlashcard),
    });

    if (!res.ok) {
        throw Error(`Error while fetching flashcards from DB: ${res}`);
    }
    const result = await res.json();

    return result;
};

/**
 * DELETE CARD
 * @param id
 * @returns updated JSON
 */
export const deleteFlashcard = async (id: string) => {
    await fetch(`/api/vocabs/${id}`, {
        method: "DELETE",
    });
};

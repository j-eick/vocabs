// flashcardsStore.js
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { FlashcardProp } from "../types/flashcard";
import { persist } from "zustand/middleware";
import { StackProp } from "../types/stack";

type State = {
    allFlashcards: FlashcardProp[];
    allStacksWithCards: StackProp[];
};

type Actions = {
    // add fetched cards to store
    saveToFlashcardStore: (flashcards: FlashcardProp[]) => void;
    // add one card to store
    addToFlashcardStore: (flashcards: FlashcardProp) => void;

    // delete one card from store
    removeFlashcardStore: (flashcards: string) => void;
    // delete all cards from store
    removeAllFlashcardsFromStack: (flashcards: string) => void;

    // add fetched stacks (incl. their cards) to store
    saveToAllStacksWithCards: (stacksAndCards: StackProp[]) => void;
    // delete specific stack (incl. all its cards) from store,
    removeStack: (stackIDtoRemove: string) => void;
};

const useFlashcardsStore = create<State & Actions>()(
    persist(
        immer(set => ({
            // all flashcards
            allFlashcards: [],
            allStacksWithCards: [],
            allStacksWithoutCards: [],

            // save to flashcardStore
            saveToFlashcardStore: cards =>
                set(() => ({
                    allFlashcards: cards,
                })),

            // ADD flashcard to store
            addToFlashcardStore: cards =>
                set(state => ({
                    allFlashcards: [...state.allFlashcards, cards],
                })),

            // filter by flashcardID
            removeFlashcardStore: flashcardIDtoRemove =>
                set(state => ({
                    allFlashcards: state.allFlashcards.filter(card => card._id !== flashcardIDtoRemove),
                })),

            // filter by flashcard-stackID
            removeAllFlashcardsFromStack: flashcardStackID =>
                set(state => ({
                    allFlashcards: state.allFlashcards.filter(card => card.stack !== flashcardStackID),
                })),

            saveToAllStacksWithCards: stacksAndCards =>
                set(() => ({
                    allStacksWithCards: stacksAndCards,
                })),

            removeStack: stackIDtoRemove =>
                set(state => ({
                    allStacksWithCards: state.allStacksWithCards.filter(stack => stack._id !== stackIDtoRemove),
                    allFlashcards: state.allFlashcards.filter(stack => stack._id !== stackIDtoRemove),
                })),
        })),
        {
            name: "myCards",
        }
    )
);

export default useFlashcardsStore;

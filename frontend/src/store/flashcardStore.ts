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
  saveToFlashcardStore: (flashcards: FlashcardProp[]) => void;
  addToFlashcardStore: (flashcards: FlashcardProp) => void;
  removeFlashcardStore: (flashcards: string) => void;
  saveToAllStacksWithCards: (stacksAndCards: StackProp[]) => void;
  removeStack: (stackIDtoRemove: string) => void;
};

const useFlashcardsStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      // all flashcards
      allFlashcards: [],
      allStacksWithCards: [],
      allStacksWithoutCards: [],

      // save to flashcardStore
      saveToFlashcardStore: (cards) =>
        set(() => ({
          allFlashcards: cards,
        })),

      // ADD flashcard to store
      addToFlashcardStore: (cards) =>
        set((state) => ({
          allFlashcards: [...state.allFlashcards, cards],
        })),

      removeFlashcardStore: (idToRemove) =>
        set((state) => ({
          allFlashcards: state.allFlashcards.filter((card) => card._id !== idToRemove),
        })),

      saveToAllStacksWithCards: (stacksAndCards) =>
        set(() => ({
          allStacksWithCards: stacksAndCards,
        })),

      removeStack: (stackIDtoRemove) =>
        set((state) => ({
          allStacksWithCards: state.allStacksWithCards.filter((stack) => stack._id !== stackIDtoRemove),
        })),

      // fetch from MongoDB
      // fetchfromMongoDB: () =>
      //   set(() => {

      //   }),

      // decrement: (qty: number) =>
      //   set((state) => {
      //     state.count -= qty
      //   }),
    })),
    {
      name: "myCards",
    }
  )
);

export default useFlashcardsStore;

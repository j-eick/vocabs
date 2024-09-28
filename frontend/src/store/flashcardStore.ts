// flashcardsStore.js
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { FlashcardProp } from "../types/flashcard";
import { persist } from "zustand/middleware";

type State = {
  allFlashcards: FlashcardProp[];
};

type Actions = {
  saveToFlashcardStore: (flashcards: FlashcardProp[]) => void;
  addToFlashcardStore: (flashcards: FlashcardProp) => void;
};

const useFlashcardsStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      // all flashcards
      allFlashcards: [],

      // save to flashcardStore
      saveToFlashcardStore: (cards) =>
        set(() => ({
          allFlashcards: cards,
        })),

      // save to flashcardStore
      addToFlashcardStore: (cards) =>
        set((state) => ({
          allFlashcards: [...state.allFlashcards, cards],
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

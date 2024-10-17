// flashcardsStore.js
import { create } from "zustand";
import { Draft } from "immer";
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
    // add one card to flashcards-array
    addToFlashcardStore: (flashcards: FlashcardProp) => void;
    // add one card to allStacksWithCards-array
    addCardToAllStacksWithCards: (flashcard: FlashcardProp, newStack?: StackProp) => void;
    // create new stack + add new card
    // createNewStackWithCard: (flashcard: FlashcardProp, createStack: boolean) => void;

    // delete one card from store
    removeFlashcardStore: (flashcards: string) => void;
    // delete all cards from store
    removeAllFlashcardsFromStack: (flashcards: string) => void;

    // add fetched stacks (incl. their cards) to store
    saveToAllStacksWithCards: (stacksAndCards: StackProp[]) => void;
    // delete specific stack (incl. all its cards) from store,
    removeStack: (stackIDtoRemove: string) => void;
    // rename specific stack
    renameStack: (stackIDtoRename: string, newName: string) => void;
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
                set(state => {
                    state.allFlashcards.push(cards);
                }),

            addCardToAllStacksWithCards: (card, newStack) =>
                set((state: Draft<State>) => {
                    if (newStack) {
                        console.log("into new stack");
                        state.allStacksWithCards.push(newStack);
                    } else {
                        console.log("into existing stack");

                        state.allStacksWithCards = state.allStacksWithCards.map(targetStack =>
                            targetStack._id === card.stack
                                ? {
                                      ...targetStack,
                                      flashcards: [...targetStack.flashcards, card],
                                  }
                                : {
                                      ...targetStack,
                                  }
                        );
                    }
                }),

            // createNewStackWithCard: (card, createStack) => set(state => {}),

            // filter by flashcardID
            removeFlashcardStore: flashcardIDtoRemove =>
                set((state: Draft<State>) => {
                    state.allFlashcards = state.allFlashcards.filter(card => card._id !== flashcardIDtoRemove);
                    state.allStacksWithCards = state.allStacksWithCards.filter(stack =>
                        stack.flashcards.map(card => card._id !== flashcardIDtoRemove)
                    );
                }),

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

            renameStack: (stackIDtoRename, newName) =>
                set(state => {
                    state.allStacksWithCards = state.allStacksWithCards.map(stack =>
                        stack._id === stackIDtoRename ? { ...stack, name: newName } : stack
                    );
                }),
        })),
        {
            name: "myCards",
        }
    )
);

export default useFlashcardsStore;

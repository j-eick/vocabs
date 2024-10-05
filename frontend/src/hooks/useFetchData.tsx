import { useEffect, useState } from "react";
import * as FlashcardApi from "../network/flashcard_apis";
import * as StackApi from "../network/stackAPIs";
import useFlashcardsStore from "../store/flashcardStore";
import { StackProp } from "../types/stack";

type UseFetchFromLSReturn = [boolean];

export default function useFetchData(): UseFetchFromLSReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // useStore
  const allflashcards = useFlashcardsStore((state) => state.allFlashcards);
  const saveToFlashcardstore = useFlashcardsStore((state) => state.saveToFlashcardStore);
  const savetoStore_allStackswithCards = useFlashcardsStore((state) => state.saveToAllStacksWithCards);

  useEffect(() => {
    if (!allflashcards.length) {
      fetchFlashcards();
    }

    async function fetchFlashcards() {
      try {
        setIsLoading(true);

        console.log("Fetch from Zustand: (in-memory) => localStorage");
        const res = await FlashcardApi.fetchFlashcards();
        const stacksAndCards: StackProp[] = await StackApi.fetchAllStacks();

        saveToFlashcardstore(res);
        savetoStore_allStackswithCards(stacksAndCards);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  return [isLoading];
}

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
    console.log(allflashcards);

    fetchFlashcards();

    async function fetchFlashcards() {
      try {
        setIsLoading(true);
        // FETCH CARDS
        const res = await FlashcardApi.fetchFlashcards();
        saveToFlashcardstore(res);
        // FETCH STACKS
        const stacksAndCards: StackProp[] = await StackApi.fetchAllStacks();
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

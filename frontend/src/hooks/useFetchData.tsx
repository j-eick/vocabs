import { useEffect, useState } from "react";
import * as FlashcardApi from "../network/flashcard_apis";
import useFlashcardsStore from "../store/flashcardStore";

type UseFetchFromLSReturn = [boolean];

export default function useFetchData(): UseFetchFromLSReturn {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const saveToFlashcardstore = useFlashcardsStore((state) => state.saveToFlashcardStore);
  const allflashcards = useFlashcardsStore((state) => state.allFlashcards);

  useEffect(() => {
    if (!allflashcards.length) {
      fetchFlashcards();
    }

    async function fetchFlashcards() {
      try {
        setIsLoading(true);

        console.log("Fetch from Zustand: (in-memory) => localStorage");
        const res = await FlashcardApi.fetchFlashcards();
        saveToFlashcardstore(res);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  return [isLoading];
}

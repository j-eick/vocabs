import { useEffect, useState } from "react";
import { FlashcardProp } from "../types/flashcard";
import * as FlashcardApi from "../network/flashcard_apis";
import isNotNEU from "../utils/isNullOrEmpty";

type UseFetchFromLSReturn = [FlashcardProp[], React.Dispatch<React.SetStateAction<FlashcardProp[]>>, boolean];

export default function useFetchData(): UseFetchFromLSReturn {
  const [fetchedCards, setfetchedCards] = useState<FlashcardProp[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchFlashcards();

    async function fetchFlashcards() {
      let localStorageData: FlashcardProp[] = []; // saved in localStorage
      let mongoDbData: FlashcardProp[] = []; // saved in MongoDB

      try {
        setIsLoading(true);

        // pull cards from LocalStorage
        const cardsFromLS = localStorage.getItem("myCards");

        // check for ls-collection "my cards"
        if (isNotNEU(cardsFromLS)) {
          console.log("a");
          localStorageData = JSON.parse(cardsFromLS);
          setfetchedCards(localStorageData);

          // if not, fetch from MongoDB update localStorage and return fetched data
        } else {
          console.log("b");
          const res = await FlashcardApi.fetchFlashcards();
          mongoDbData = res;
          localStorage.setItem("myCards", JSON.stringify(res));
          setfetchedCards(mongoDbData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
  }, []);

  return [fetchedCards, setfetchedCards, isLoading];
}

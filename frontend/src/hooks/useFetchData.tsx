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
      let lastDBState: FlashcardProp[] = []; // saved in localStorage
      let localStorageData: FlashcardProp[] = []; // saved in localStorage
      let mongoDbData: FlashcardProp[] = []; // saved in MongoDB

      try {
        setIsLoading(true);

        // pull cards from LocalStorage
        const cardsFromLS = localStorage.getItem("myCards");
        const lastSession = localStorage.getItem("lastSession");

        // check if both collections exist
        if (isNotNEU(cardsFromLS) && isNotNEU(lastSession)) {
          console.log("a");
          lastDBState = JSON.parse(lastSession);
          localStorageData = JSON.parse(cardsFromLS);

          // if same length, return their data
          if (isSameLength(lastDBState, localStorageData)) {
            setfetchedCards(localStorageData);
          }
          // if not, fetch from MongoDB update localStorage and return fetched data
        } else {
          console.log("b");
          const res = await FlashcardApi.fetchFlashcards();
          mongoDbData = res;
          localStorage.setItem("lastSession", JSON.stringify(res));
          localStorage.setItem("myCards", JSON.stringify(res));
          setfetchedCards(mongoDbData);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }

      function isSameLength(localsS: object[], mongoDB: object[]): boolean {
        const dbDataLength = JSON.stringify(mongoDB).length;
        const lsDataLength = JSON.stringify(localsS).length;
        console.log("DB-Length: " + dbDataLength);
        console.log("LS-Length: " + lsDataLength);
        if (dbDataLength === lsDataLength) {
          return true;
        } else {
          return false;
        }
      }
    }
  }, []);

  return [fetchedCards, setfetchedCards, isLoading];
}

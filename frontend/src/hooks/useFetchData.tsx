import { useEffect, useState } from "react";
import pullFromLocalStorage from "../utils/pullFromLocalStorage";
import { FlashcardProp } from "../types/flashcard";
import * as FlashcardApi from "../network/flashcard_apis";
import { getStringObjectArrayLength } from "../utils/getStringObjectArrayLength";

type UseFetchFromLSReturn = [FlashcardProp[], React.Dispatch<React.SetStateAction<FlashcardProp[]>>];

export default function useFetchData(): UseFetchFromLSReturn {
  const [data, setData] = useState<FlashcardProp[]>([]);

  useEffect(() => {
    fetchAndCompare();

    async function fetchAndCompare() {
      // fetching data from lStorage & MongoDB
      const [localS, mongoDB] = await Promise.all([fetchFromLS(), fetchFromDB()]);

      // compare stringified data from localStorage & MongoDB
      // returns true || false
      const isSameLength = sameLength(localS, mongoDB);

      // IF NOT same length, save state of MongoDB into lStorage
      if (!isSameLength) {
        console.log("sending to lStorage");
        localStorage.setItem("myCards", JSON.stringify(mongoDB));
        setData(pullFromLocalStorage("myCards"));
      } else {
        console.log("Reading from lStorage");
        setData(pullFromLocalStorage("myCards"));
      }

      function sameLength(localsS: object[], mongoDB: object[]) {
        const dbDataLength = getStringObjectArrayLength(JSON.stringify(mongoDB));
        const lsDataLength = getStringObjectArrayLength(JSON.stringify(localsS));

        console.log("DB-Length: " + dbDataLength);
        console.log("LS-Length: " + lsDataLength);

        if (dbDataLength === lsDataLength) {
          return true;
        } else {
          return false;
        }
      }
    }

    async function fetchFromDB() {
      const fetchedCards = await FlashcardApi.fetchFlashcards();
      if (Array.isArray(fetchedCards)) {
        return fetchedCards;
      } else {
        throw new Error("function fetchFromDB() did not return an array.");
      }
    }
    function fetchFromLS() {
      const data = pullFromLocalStorage("myCards");
      if (Array.isArray(data)) {
        return data;
      } else {
        throw new Error("function fetchFromLS() did not return an array.");
      }
    }
  }, []);

  return [data, setData];
}

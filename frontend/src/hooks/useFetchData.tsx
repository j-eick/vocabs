import { useEffect, useState } from "react";
import * as FlashcardApi from "../network/flashcard_apis";
import * as StackApi from "../network/stackAPIs";
import useFlashcardsStore from "../store/flashcardStore";
import { StackProp } from "../types/stack";

type UseFetchFromLSReturn = [boolean];

export default function useFetchData(): UseFetchFromLSReturn {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { allFlashcards, saveToFlashcardStore, saveToAllStacksWithCards } = useFlashcardsStore(state => state);

    useEffect(() => {
        console.log(allFlashcards);

        fetchFlashcards();

        async function fetchFlashcards() {
            try {
                setIsLoading(true);

                // FETCH CARDS
                const res = await FlashcardApi.fetchFlashcards();
                saveToFlashcardStore(res);

                // FETCH STACKS
                const stacksAndCards: StackProp[] = await StackApi.fetchAllStacks();
                saveToAllStacksWithCards(stacksAndCards);
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }
    }, []);

    return [isLoading];
}

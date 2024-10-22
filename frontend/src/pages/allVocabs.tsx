import useFlashcardsStore from "../store/flashcardStore";
import ListItem from "../components/ui/list-item/allVocabs-listView/ListItem";
import CollectionsList from "../components/ui/collections/CollectionsList";
import { StackProp } from "../types/stack";
import { useEffect, useState } from "react";
import { FlashcardProp } from "../types/flashcard";

export default function AllVocabsPage() {
    const allFlashcards: FlashcardProp[] = useFlashcardsStore(state => state.allFlashcards);
    const [selectedCollection, setSelectedCollection] = useState<StackProp | null>(null);

    const filterFlashcards = allFlashcards.filter(card => card.stack === selectedCollection?._id);

    return (
        <div className="relative h-full pb-10">
            <CollectionsList
                selectedCollection={selectedCollection}
                setSelectedCollection={setSelectedCollection}
            />
            <ul
                role="list"
                className={`pt-2 pb-4 w-5/6 mx-auto 
                            overflow-auto text-left`}
            >
                {selectedCollection === null
                    ? allFlashcards.map(card => (
                          <ListItem
                              key={card._id}
                              flashcard={card}
                          />
                      ))
                    : filterFlashcards.map(card => (
                          <ListItem
                              key={card._id}
                              flashcard={card}
                          />
                      ))}
            </ul>
        </div>
    );
}

import useFlashcardsStore from "../store/flashcardStore";
import ListItem from "../components/ui/list-item/allVocabs-listView/ListItem";
import CollectionsList from "../components/ui/collections/CollectionsList";

export default function AllVocabsPage() {
    const allFlashcards = useFlashcardsStore(state => state.allFlashcards);

    return (
        <div className="relative h-full pb-10">
            <CollectionsList />
            <ul
                role="list"
                className={`pt-2 pb-4 w-5/6 mx-auto 
                            overflow-auto text-left`}
            >
                {allFlashcards.length >= 1 ? (
                    allFlashcards.map(card => (
                        <ListItem
                            key={card._id}
                            flashcard={card}
                        />
                    ))
                ) : (
                    <>
                        <p className="mb-10">
                            You don't have one single flashcard yet. Work up! <br /> <br /> Head over to Dashboard and
                            create your first flashcard.
                        </p>
                    </>
                )}
            </ul>
        </div>
    );
}

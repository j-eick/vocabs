import useFlashcardsStore from "../store/flashcardStore";
import ListItem from "../components/ui/list-item/allVocabs-listView/ListItem";
import Nav from "../components/ui/Nav";
import CollectionsList from "../components/ui/collections/CollectionsList";

export default function AllVocabsPage() {
    const allFlashcards = useFlashcardsStore(state => state.allFlashcards);

    return (
        <main className="relative h-full pt-4 pb-10 flex flex-col gap-5">
            <CollectionsList />
            <ul
                role="list"
                className="pt-2 pb-4 w-5/6 mx-auto overflow-auto"
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
            <Nav
                navItems={[
                    { path: "/", name: "Dashboard", active: false },
                    { path: "/study", name: "Session", active: false },
                    { path: "/allVocabs", name: "Collection", active: true },
                ]}
            />
        </main>
    );
}

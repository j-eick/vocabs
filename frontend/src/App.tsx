import useFlashcardsStore from "./store/flashcardStore";
import Header from "./components/ui/header/Header";
import { FlashcardProp } from "./types/flashcard";
import FormModal_blurredBg from "./components/ui/modal/Form_ModalblurredBg";
import useButtonStore from "./store/buttonStore";
import useModalStore from "./store/modalStore";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import { StackProp } from "./types/stack";
import * as StackAPI from "../src/network/stackAPIs.ts";
import useFetchData from "./hooks/useFetchData.tsx";
import InfoModal from "./components/ui/modal/InfoModal.tsx";
import Nav from "./components/ui/Nav.tsx";

export default function App() {
    const [isLoading] = useFetchData();
    const { allFlashcards, allStacksWithCards, removeAllFlashcardsFromStack, removeStack } = useFlashcardsStore(
        state => state
    );
    const { ShowFlashcardFormModal, setFlashcardFormModal, ShowInfoModal } = useModalStore(state => state);
    const { ShowAddFlashcardButton, setAddFlashcardButton } = useButtonStore(state => state);
    const [showAskDelete, setShowAskDelete] = useState<string | null>("");

    const handleAskDeleteStack = (stack: StackProp) => {
        setShowAskDelete(stack._id);
    };

    const handleConfirmDelete = async (stack: StackProp) => {
        try {
            await StackAPI.deleteStackWithCards(stack._id, true);
            removeAllFlashcardsFromStack(stack._id);
            removeStack(stack._id);
            setShowAskDelete(null);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {}, [allStacksWithCards]);

    return (
        <main className="relative w-screen h-screen">
            {ShowInfoModal && (
                <InfoModal
                    className="w-4/5 p-3 z-50 rounded-lg border-none bg-blue-300"
                    content={<p>New Stack was created</p>}
                />
            )}
            <Header />
            {/* DASHBOARD ITEMS */}
            <section className="relative w-5/6 mx-auto my-0 mt-5">
                <LatestVocab flashcards={allFlashcards} />
            </section>
            {allStacksWithCards && (
                <ul>
                    {allStacksWithCards.map((stack, i) => (
                        <li
                            key={i}
                            className="border-2 relative hover:bg-slate-200"
                        >
                            <p className="flex justify-evenly ">
                                {stack.name}{" "}
                                <MdOutlineDeleteOutline
                                    className="cursor-pointer"
                                    onClick={e => {
                                        handleAskDeleteStack(stack);
                                        e.stopPropagation();
                                    }}
                                />
                            </p>
                            {showAskDelete === stack._id && (
                                <div className="flex-col bg-red-300">
                                    <span>
                                        Are you sure? <br />{" "}
                                        <span className="text-xs">(Stack incl. all its cards will be deleted.)</span>
                                    </span>
                                    <div className="flex gap-1 justify-center">
                                        <button
                                            className="border"
                                            onClick={e => {
                                                handleConfirmDelete(stack);
                                                e.stopPropagation();
                                            }}
                                        >
                                            yes
                                        </button>
                                        <button
                                            className="border"
                                            onClick={e => {
                                                setShowAskDelete("");
                                                e.stopPropagation();
                                            }}
                                        >
                                            no
                                        </button>
                                    </div>
                                </div>
                            )}
                            <p>{`Number of flashcards: ${stack.flashcards.length}`}</p>
                        </li>
                    ))}
                </ul>
            )}
            <FormModal_blurredBg
                show={ShowFlashcardFormModal}
                onClickOutside={() => setFlashcardFormModal(false)}
            />
            {/* BUTTON: CREATE NEW VOCAB */}
            {ShowAddFlashcardButton && (
                <button
                    onClick={e => {
                        e.stopPropagation();
                        setFlashcardFormModal(true);
                        setAddFlashcardButton(false);
                    }}
                    className={`fixed w-5/6 p-3 bottom-6 -translate-x-1/2
										border-2 rounded-md`}
                >
                    Add Vocab
                </button>
            )}
            <Nav navItems={["Dashboard", "Session", "Collection"]} />
        </main>
    );

    type LatestVocabProps = {
        flashcards: FlashcardProp[];
    };
    //TODO: turn this into a caroussel.
    function LatestVocab({ flashcards }: LatestVocabProps) {
        const totalEntries = flashcards.length;
        let lastMaxThreeEntries: FlashcardProp[] = [];

        if (!flashcards || !flashcards.length) {
            throw new Error("flashcards is empty");
        }

        // array has min. 3 items, take last 3:
        if (totalEntries >= 3) {
            lastMaxThreeEntries = flashcards.slice(flashcards.length - 3, flashcards.length);
        } else if (totalEntries <= 2) {
            lastMaxThreeEntries = flashcards;
        }

        return (
            <div className="mx-auto my-0 text-left border-2">
                <p>last 3 entries</p>
                <ul
                    role="list"
                    className="border border-slate-600"
                >
                    {flashcards.length !== 0 ? (
                        lastMaxThreeEntries.map(entry => <li key={entry._id}>{entry.front_title}</li>)
                    ) : (
                        <li>You have 0 flashcards</li>
                    )}
                </ul>
            </div>
        );
    }
}

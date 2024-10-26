import useFlashcardsStore from "./store/flashcardStore";
import { FlashcardProp } from "./types/flashcard";
import FormModal_blurredBg from "./components/ui/modal/Form_ModalblurredBg.tsx";
import useButtonStore from "./store/buttonStore";
import useModalStore from "./store/modalStore";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useState } from "react";
import { StackProp } from "./types/stack";
import * as StackAPI from "../src/network/stackAPIs.ts";
import useFetchData from "./hooks/useFetchData.tsx";
import InfoModal from "./components/ui/modal/InfoModal.tsx";
import Profile from "./components/ui/profile/Profile.tsx";
import Header from "./components/ui/header/Header.tsx";

export default function App() {
    const [isLoading] = useFetchData();
    const allStacksWithCards = useFlashcardsStore(state => state.allStacksWithCards);
    const allFlashcards = useFlashcardsStore(state => state.allFlashcards);
    const removeAllFlashcardsFromStack = useFlashcardsStore(state => state.removeAllFlashcardsFromStack);
    const removeStack = useFlashcardsStore(state => state.removeStack);
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

    return (
        <div className="relative">
            {ShowInfoModal && (
                <InfoModal
                    className="w-4/5 p-3 z-50 rounded-lg border-none bg-blue-300"
                    content={<p>New Stack was created</p>}
                />
            )}
            <Header className="h-1/4 px-3 flex items-center justify-between bg-green-400">
                <Profile className="" />
                {/* BUTTON: CREATE NEW VOCAB */}
                {ShowAddFlashcardButton && (
                    <button
                        onClick={e => {
                            e.stopPropagation();
                            setFlashcardFormModal(true);
                            setAddFlashcardButton(false);
                        }}
                        className={`w-2/6 h-2/3 px-3 flex items-center

								    border-2 rounded-md bg-red-400`}
                    >
                        Add Vocab
                    </button>
                )}
            </Header>
            {/* DASHBOARD ITEMS */}
            <section className="relative w-5/6 mx-auto my-0 mt-5">
                <LatestVocab flashcards={allFlashcards} />
            </section>
            {allStacksWithCards.length >= 1 && (
                <ul className="w-4/5 max-h-60 mx-auto mt-5 border-2 border-red-400 overflow-y-auto">
                    {allStacksWithCards.map((stack, i) => (
                        <li
                            key={i}
                            className="border-2 relative hover:bg-slate-200"
                        >
                            <p className="flex justify-evenly gap-2 ">
                                {stack.name}, {`ID: ${stack._id.slice(stack._id.length - 3)}`}
                                <MdOutlineDeleteOutline
                                    className="cursor-pointer"
                                    onClick={e => {
                                        handleAskDeleteStack(stack);
                                        e.stopPropagation();
                                    }}
                                />
                            </p>
                            <p>{`Number of flashcards: ${stack.flashcards.length}`}</p>
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
                        </li>
                    ))}
                </ul>
            )}
            <FormModal_blurredBg
                show={ShowFlashcardFormModal}
                onClickOutside={() => {
                    setFlashcardFormModal(false);
                    setAddFlashcardButton(true);
                }}
            />
        </div>
    );

    type LatestVocabProps = {
        flashcards: FlashcardProp[];
    };
    //TODO: turn this into a caroussel.
    function LatestVocab({ flashcards }: LatestVocabProps) {
        const totalEntries = flashcards.length;
        let lastMaxThreeEntries: FlashcardProp[] = [];

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

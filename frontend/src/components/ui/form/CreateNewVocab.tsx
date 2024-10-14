import { useEffect, useRef, useState } from "react";
import useFlashcardsStore from "../../../store/flashcardStore";
import { useClickOutside } from "../../../utils/clickOutside";
import useButtonStore from "../../../store/buttonStore";
import useModalStore from "../../../store/modalStore";
import * as FlashcardAPI from "../../../network/flashcard_apis";

export type NewFlashcard = {
    _id: string;
    front_title: string;
    front_text: string;
    back_title: string;
    back_text: string;
    stack: string;
};

type CreateNewVocab = {
    onClickOutside: () => void;
    dropdownValue: string;
};

// INFO: Add Pending STate while flashcard is being created
export default function CreateNewVocab({ onClickOutside, dropdownValue }: CreateNewVocab) {
    const { setAddFlashcardButton } = useButtonStore(state => state);
    const { setFlashcardFormModal, setShowInfoModal } = useModalStore(state => state);
    const { addToFlashcardStore } = useFlashcardsStore(state => state);
    const [newFlashcard, setNewFlashcard] = useState<NewFlashcard>({
        _id: "",
        front_title: "",
        front_text: "",
        back_title: "",
        back_text: "",
        stack: "",
    });

    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, onClickOutside);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await FlashcardAPI.createFlashcard(newFlashcard);

            console.log(res);

            if (res) {
                addToFlashcardStore(res);
                // reset input field
                setNewFlashcard({
                    _id: "",
                    front_title: "",
                    front_text: "",
                    back_title: "",
                    back_text: "",
                    stack: "",
                });
            }

            // HIDE modal && SHOW add-vocab-button
            setFlashcardFormModal(false);
            setAddFlashcardButton(true);
            setShowInfoModal(true, 2);
        } catch (err) {
            console.error(err);
        }
    };

    const inputFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewFlashcard(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        setNewFlashcard(prev => ({
            ...prev,
            stack: dropdownValue,
        }));
    }, [dropdownValue]);

    return (
        <div>
            <form
                onSubmit={e => handleSubmit(e)}
                action="/api/vocabs"
                method="post"
                name="create flashcard"
                className="mt-4 flex flex-col"
            >
                <label htmlFor="frontTitle">Front Title</label>
                <input
                    id="frontTitle"
                    type="text"
                    name="front_title"
                    value={newFlashcard.front_title}
                    onChange={e => inputFieldHandler(e)}
                    className="border-2"
                    autoComplete="off"
                />
                <label htmlFor="frontDescription">Front Description </label>
                <input
                    id="frontDescription"
                    type="text"
                    name="front_text"
                    value={newFlashcard.front_text}
                    onChange={e => inputFieldHandler(e)}
                    className="border-2"
                    autoComplete="off"
                />
                <label htmlFor="backTitle">Back Title</label>
                <input
                    id="backTitle"
                    type="text"
                    name="back_title"
                    value={newFlashcard.back_title}
                    onChange={e => inputFieldHandler(e)}
                    className="border-2"
                    autoComplete="off"
                />
                <label htmlFor="backDescription">Back Description</label>
                <input
                    id="backDescription"
                    type="text"
                    name="back_text"
                    value={newFlashcard.back_text}
                    onChange={e => inputFieldHandler(e)}
                    className="border-2"
                    autoComplete="off"
                />
                <button
                    type="submit"
                    className="bg-slate-300 mt-4 p-2 cursor-pointer"
                >
                    Create Vocab
                </button>
            </form>
        </div>
    );
}

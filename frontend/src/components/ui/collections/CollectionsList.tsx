import useFlashcardsStore from "../../../store/flashcardStore";
import { StackProp } from "../../../types/stack";
import * as StackAPI from "../../../network/stackAPIs.ts";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import Icon from "../icon/Icon.tsx";
import { BlurredModal } from "../modal/BlurredModal.tsx";
import { useClickOutside } from "../../../utils/clickOutside.ts";

type CollectionsListProps = {
    selectedCollection: StackProp | null;
    setSelectedCollection: Dispatch<SetStateAction<StackProp | null>>;
};

export default function CollectionsList({ selectedCollection, setSelectedCollection }: CollectionsListProps) {
    const removeAllFlashcardsFromStack = useFlashcardsStore(state => state.removeAllFlashcardsFromStack);
    const removeStack = useFlashcardsStore(state => state.removeStack);
    const allStacksWithCards = useFlashcardsStore(state => state.allStacksWithCards);
    const renameStack = useFlashcardsStore(state => state.renameStack);
    const [targetRenameDelete_Modal, setTargetRenameDelete_Modal] = useState<string>("");
    const [showRenameDelete_Modal, setShowRenameDelete_Modal] = useState<boolean>(false);
    const [newCollectionName, setNewCollectionName] = useState<string>("");
    // Modals: Input & Delete
    const [showInput_Modal, setShowInput_Modal] = useState<StackProp | null>(null);
    const [isInputOpen, setIsInputOpen] = useState(false);
    const [showAskDelete, setShowAskDelete] = useState<string | null>("");
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const ref = useRef<HTMLUListElement>(null);
    useClickOutside(ref, () => {
        setSelectedCollection(null);
    });

    const inputFieldHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setNewCollectionName(value);
    };

    const handleNewCollectionNameSubmit = async (e: FormEvent<HTMLFormElement>, stack: StackProp) => {
        e.preventDefault();
        const StackID = stack._id;
        try {
            const res = await StackAPI.renameStack(StackID, newCollectionName);
            if (res) {
                renameStack(stack._id, newCollectionName);
                setNewCollectionName("");
                setTargetRenameDelete_Modal("");
                setShowInput_Modal(null);
            } else {
                console.error("Could not rename collection.");
            }
        } catch (error) {
            console.error("Error while attemtping to change name of collection: " + error);
        }
    };

    const handleConfirmDelete = async (stack: StackProp) => {
        try {
            await StackAPI.deleteStackWithCards(stack._id, true);
            removeAllFlashcardsFromStack(stack._id);
            removeStack(stack._id);
            setShowAskDelete(null);
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full">
            {allStacksWithCards && (
                <>
                    {/* //todo: consider using an array of refs or mapping, to create a ref for every LI-element */}
                    <ul
                        ref={ref}
                        className={`px-4 h-36 mx-auto
                                    flex items-center gap-2 overflow-x-auto 
                                    bg-slate-300`}
                    >
                        {allStacksWithCards.map((stack, i) => (
                            <li
                                key={i}
                                className={`relative p-3 h-24 min-w-44 grid grid-cols-10 overflow-hidden
                                        bg-mattBlue rounded-xl shadow-22 text-left
                                        ${
                                            showRenameDelete_Modal
                                                ? selectedCollection?._id !== stack._id &&
                                                  "text-slate-500 pointer-events-none"
                                                : "hover:bg-mattBlue2"
                                        }
                                        ${
                                            selectedCollection?._id === stack._id
                                                ? "border-2 border-white bg-mattBlue2"
                                                : ""
                                        }`}
                                onClick={() => {
                                    if (selectedCollection?._id === stack._id) {
                                        setSelectedCollection(null);
                                        console.log(selectedCollection?._id);
                                    } else {
                                        setSelectedCollection(stack);
                                    }
                                }}
                            >
                                <div className="px-2 col-span-8 flex flex-col justify-evenly">
                                    <h1 className="text-lg font-semibold text-left">{stack.name}</h1>
                                    <span>{`ID: ${stack._id.slice(stack._id.length - 3)}`}</span>
                                    <p>{`Cards: ${stack.flashcards.length}`}</p>
                                </div>
                                <div className="col-span-2 flex justify-end items-center">
                                    <Icon
                                        icon={BsThreeDotsVertical}
                                        className={`cursor-pointer ${
                                            selectedCollection?._id === stack._id ? "" : "hidden"
                                        }`}
                                        onClick={e => {
                                            setTargetRenameDelete_Modal(stack._id);
                                            setShowRenameDelete_Modal(true);
                                            e.stopPropagation();
                                            console.log(stack._id);
                                        }}
                                    />
                                </div>
                                {targetRenameDelete_Modal === stack._id && (
                                    <BlurredModal
                                        className={`absolute w-full h-full animate-fadeIn`}
                                        blur="smm"
                                        color="blue"
                                        show={showRenameDelete_Modal}
                                        onClickOutside={() => {
                                            setIsInputOpen(false);
                                            setShowRenameDelete_Modal(false);
                                            setSelectedCollection(null);
                                        }}
                                        content={
                                            <div
                                                className={`flex h-full 
                                                        rounded-xl text-white`}
                                            >
                                                <button
                                                    className={`w-1/2 grid place-items-center text-lg leading-5" 
                                                                ${
                                                                    isInputOpen
                                                                        ? "text-slate-200 opacity-40"
                                                                        : "text-slate-200"
                                                                }
                                                            `}
                                                    onClick={e => {
                                                        setShowInput_Modal(stack);
                                                        setIsInputOpen(true);
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    change name
                                                </button>
                                                <div className={`w-1/2 h-full grid place-items-center`}>
                                                    <Icon
                                                        className={`text-2xl cursor-pointer 
                                                                    ${
                                                                        isDeleteModalOpen
                                                                            ? "text-slate-200 opacity-40"
                                                                            : "text-slate-200"
                                                                    }`}
                                                        icon={MdOutlineDeleteOutline}
                                                        onClick={e => {
                                                            setIsDeleteModalOpen(true);
                                                            setShowAskDelete(stack._id);
                                                            setSelectedCollection(stack);
                                                            e.stopPropagation();
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        }
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                    {isInputOpen && showInput_Modal?._id && (
                        <BlurredModal
                            className={`absolute z-10 w-5/6 h-max py-3
                                        mx-auto left-1/2 -translate-x-1/2 rounded-2xl bottom-5
                                        animate-fadeIn`}
                            blur="smm"
                            color="mattBlue"
                            show={isInputOpen}
                            content={
                                <form
                                    className={`py-1 flex flex-col gap-4 text-white text-xl animate-fadeIn`}
                                    onSubmit={e => handleNewCollectionNameSubmit(e, showInput_Modal)}
                                >
                                    <label htmlFor="renameCollection">Choose new name</label>
                                    <input
                                        id="renameCollection"
                                        type="text"
                                        name="name"
                                        value={newCollectionName}
                                        onChange={e => inputFieldHandler(e)}
                                        autoComplete="off"
                                        className={`px-2 py-2 bg-slate-200 text-slate-700 rounded-lg text-lg
                                            focus:ring2 focus:outline-slate-100`}
                                        autoFocus
                                    />
                                    <button
                                        type="submit"
                                        className="py-1 bg-slate-400 rounded-lg"
                                    >
                                        Ok
                                    </button>
                                    <button
                                        type="button"
                                        className="py-1 border border-slate-500 rounded-lg text-slate-600"
                                        onClick={() => {
                                            setIsInputOpen(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </form>
                            }
                        />
                    )}
                    {/* MODAL: Really delete this stack with all cards? */}
                    {showAskDelete === selectedCollection?._id && (
                        <div
                            className="absolute z-10 w-5/6 h-max py-3 
                                        mx-auto left-1/2 -translate-x-1/2 rounded-2xl
                                        animate-fadeIn flex-col bg-red-300"
                        >
                            <span>
                                <p>
                                    Really delete your
                                    <span className="font-semibold"> {selectedCollection.name} </span>collection?
                                </p>
                                <p className="text-xs">(Stack incl. all its cards will be deleted.)</p>
                            </span>
                            <div className="flex gap-1 justify-center">
                                <button
                                    className="border"
                                    onClick={e => {
                                        handleConfirmDelete(selectedCollection);
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
                </>
            )}
        </div>
    );
}

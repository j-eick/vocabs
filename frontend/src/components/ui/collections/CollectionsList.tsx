import useFlashcardsStore from "../../../store/flashcardStore";
import { StackProp } from "../../../types/stack";
import * as StackAPI from "../../../network/stackAPIs.ts";
import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import Icon from "../icon/Icon.tsx";
import { BlurredModal } from "../modal/BlurredModal.tsx";

export default function CollectionsList() {
    const removeAllFlashcardsFromStack = useFlashcardsStore(state => state.removeAllFlashcardsFromStack);
    const removeStack = useFlashcardsStore(state => state.removeStack);
    const allStacksWithCards = useFlashcardsStore(state => state.allStacksWithCards);
    const renameStack = useFlashcardsStore(state => state.renameStack);
    const [showAskDelete, setShowAskDelete] = useState<string | null>("");
    const [targetStack_Modal, setTargetStack_Modal] = useState<string>("");
    const [isInputOpen, setIsInputOpen] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState<string>("");
    const [editInput_Modal, setEditInput_Modal] = useState<StackProp>({
        _id: "",
        name: "",
        description: "",
        flashcards: [],
        createdAt: "",
        updatedAt: "",
    });

    const handleShowModalEditStack = (e: MouseEvent<SVGElement> | TouchEvent, stack: StackProp) => {
        setTargetStack_Modal(stack._id);
        console.log(stack._id);
        e.stopPropagation();
    };

    const handleEditStack = (e: MouseEvent, stack: StackProp) => {
        setEditInput_Modal(stack);
        setIsInputOpen(true);
        e.stopPropagation();
    };

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
                // setEditInputModal(false);
                setTargetStack_Modal("");
                setNewCollectionName("");
                setEditInput_Modal("");
            } else {
                console.log("b");
            }
        } catch (error) {
            console.error("Error while attemtping to change name of collection: " + error);
        }
    };

    const handleAskDeleteStack = (e: MouseEvent<SVGElement>, stack: StackProp) => {
        e.stopPropagation();
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
        <div className="w-full">
            {allStacksWithCards && (
                <>
                    <ul
                        className={`px-2 h-28 mx-auto
                                flex gap-2 overflow-x-auto`}
                    >
                        {allStacksWithCards.map((stack, i) => (
                            <li
                                key={i}
                                className={`relative p-3 h-24 min-w-44 
                                        grid grid-cols-10 overflow-hidden
                                        bg-slate-300 rounded-xl shadow-22
                                        hover:bg-slate-200`}
                            >
                                <div className="px-2 col-span-8 flex flex-col justify-evenly">
                                    <h1 className="text-lg font-semibold text-left">{stack.name}</h1>
                                    <span>{`ID: ${stack._id.slice(stack._id.length - 3)}`}</span>
                                    <p>{`Cards: ${stack.flashcards.length}`}</p>
                                </div>
                                <div className="col-span-2 flex justify-end items-center">
                                    <Icon
                                        icon={BsThreeDotsVertical}
                                        onClick={e => handleShowModalEditStack(e, stack)}
                                        className="cursor-pointer"
                                    />
                                </div>
                                {targetStack_Modal === stack._id && (
                                    <BlurredModal
                                        className={`absolute w-full h-full animate-fadeIn`}
                                        blur="smm"
                                        color="blue"
                                        content={
                                            <div
                                                className={`flex h-full 
                                                        rounded-xl text-white`}
                                            >
                                                <button
                                                    className={`w-1/2 grid place-items-center text-lg leading-5" ${
                                                        isInputOpen ? "text-slate-300" : "text-white"
                                                    }`}
                                                    onClick={e => handleEditStack(e, stack)}
                                                >
                                                    change name
                                                </button>
                                                <div className="w-1/2 h-full grid place-items-center">
                                                    <Icon
                                                        className="text-2xl cursor-pointer"
                                                        icon={MdOutlineDeleteOutline}
                                                        onClick={e => handleAskDeleteStack(e, stack)}
                                                    />
                                                </div>
                                            </div>
                                        }
                                    />
                                )}
                                {/* {editInput_Modal._id === stack._id && (
                                    <BlurredModal
                                        className="absolute w-full h-full animate-fadeIn"
                                        content={
                                            <form
                                                className="absolute z-50 inset-0 p-2  bg-slate-300 text-black animate-fadeIn"
                                                action="patch"
                                                onSubmit={e => handleNewCollectionNameSubmit(e, stack)}
                                            >
                                                <label htmlFor="renameCollection">Pick new name</label>
                                                <input
                                                    id="renameCollection"
                                                    type="text"
                                                    name="name"
                                                    value={newCollectionName}
                                                    onChange={e => inputFieldHandler(e)}
                                                    autoComplete="off"
                                                    className="px-2 py-1 bg-slate-300 text-slate-800"
                                                />
                                                <button
                                                    type="submit"
                                                    className="bg-slate-400 rounded-xl"
                                                >
                                                    Send
                                                </button>
                                            </form>
                                        }
                                    />
                                )} */}
                                {/* MODAL: Really delete this stack with all cards? */}
                                {showAskDelete === stack._id && (
                                    <div className="flex-col bg-red-300">
                                        <span>
                                            Are you sure? <br />{" "}
                                            <span className="text-xs">
                                                (Stack incl. all its cards will be deleted.)
                                            </span>
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
                    {editInput_Modal._id && (
                        <BlurredModal
                            className={`absolute z-10 w-5/6 h-max py-3
                                        mx-auto left-1/2 -translate-x-1/2 rounded-2xl
                                        animate-fadeIn`}
                            blur="smm"
                            color="blue"
                            show={isInputOpen}
                            onClickOutside={() => setIsInputOpen(false)}
                            content={
                                <form
                                    className="py-1 flex flex-col gap-4 text-white text-xl animate-fadeIn"
                                    action="patch"
                                    onSubmit={e => handleNewCollectionNameSubmit(e, editInput_Modal)}
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
                                </form>
                            }
                        />
                    )}
                </>
            )}
        </div>
    );
}

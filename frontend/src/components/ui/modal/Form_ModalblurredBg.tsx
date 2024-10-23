import CreateNewVocab from "../form/CreateNewVocab";
import useFlashcardsStore from "../../../store/flashcardStore";
import Dropdown from "../dropdown-menu/Dropdown";
import { ChangeEvent, useRef, useState } from "react";
import { useClickOutside } from "../../../utils/clickOutside";

type ModalProps = {
    show: boolean;
    onClickOutside: () => void;
};

export default function FormModal_blurredBg({ onClickOutside, show }: ModalProps) {
    const { allStacksWithCards } = useFlashcardsStore(state => state);
    const [stackDropDownValue, setStackDropDownValue] = useState("");
    const [selectedCollection, setSelectedCollection] = useState<string>("");

    const ref = useRef<HTMLDivElement>(null);
    useClickOutside(ref, onClickOutside);

    function handleDropdownChange(e: ChangeEvent<HTMLSelectElement>) {
        e.preventDefault();
        console.log(e.target.value);
        const selectedStackID = e.target.value;
        setStackDropDownValue(selectedStackID);
    }

    return (
        show && (
            <div
                className={`absolute inset-0 pt-10
                  backdrop-blur-md backdrop-brightness-80`}
            >
                <div
                    ref={ref}
                    className="w-4/5 mx-auto flex flex-col gap-5"
                >
                    {allStacksWithCards.length !== 0 ? (
                        <div className="min-h-32 flex flex-col p-4 rounded-xl bg-zinc-200">
                            <span>Collections:</span>
                            {allStacksWithCards.length <= 3 ? (
                                <ul
                                    className={`w-full mx-auto p-4
                                                flex gap-2 justify-center`}
                                >
                                    {allStacksWithCards.map(stack => (
                                        <li
                                            key={stack._id}
                                            className={`p-1 border border-slate-800 
                                                    ${selectedCollection === stack._id ? "border-white" : ""}
                                                `}
                                            onClick={() => {
                                                if (selectedCollection === stack._id) {
                                                    setSelectedCollection("");
                                                } else {
                                                    setSelectedCollection(stack._id);
                                                }
                                            }}
                                        >
                                            {stack.name}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div
                                    className={`w-full min-h-32 mx-auto
                                            rounded-xl bg-zinc-200 
                                          `}
                                >
                                    <Dropdown
                                        listItems={allStacksWithCards}
                                        onChange={handleDropdownChange}
                                        value={stackDropDownValue}
                                    />
                                </div>
                            )}
                        </div>
                    ) : (
                        <div
                            className={`min-h-32 flex flex-col p-4 
                                        rounded-xl bg-zinc-200`}
                        >
                            No collections yet. <br />
                            Create your first collection?
                        </div>
                    )}
                    <div
                        className={`w-full min-h-44 mx-auto my-0  
                                    flex items-center justify-center 
                                    rounded-xl bg-zinc-200`}
                    >
                        <div className="pb-5">
                            <CreateNewVocab dropdownValue={stackDropDownValue || selectedCollection} />
                        </div>
                    </div>
                </div>
            </div>
        )
    );
}

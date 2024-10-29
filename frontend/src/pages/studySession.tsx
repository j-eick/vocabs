import { useLocation } from "react-router";
import CardCaroussel from "../components/ui/cardCaroussel/CardCaroussel";
import useFlashcardsStore from "../store/flashcardStore";
import { useEffect, useState } from "react";
import Button from "../components/ui/button/Button";
import Icon from "../components/ui/icon/Icon";

export default function StudySession() {
    const [index, setIndex] = useState<number>(0);

    const allFlashcards = useFlashcardsStore(state => state.allFlashcards);
    const { front_title, front_text, back_title, back_text, createdAt, updatedAt } = allFlashcards[index];

    const [showBack, setShowBack] = useState(false);
    const path = useLocation();

    function handleShowClick() {
        setShowBack(!showBack);
    }

    useEffect(() => {
        console.log(path);
    });

    const options: string[] = ["don't know", "not sure", "I know"];

    return (
        <div
            className={`relative w-10/12 h-full pt-24 mx-auto
                         `}
        >
            <div className="h-8.5/10 flex flex-col gap-3">
                <CardCaroussel
                    className="min-h-32 bg-teal-600/30"
                    flashcards={allFlashcards}
                    showBack={showBack}
                />
                <Button
                    wrapper="flex justify-end"
                    className="relative px-3 py-2 flex items-center gap-1 text-slate-400"
                    disabled={true}
                >
                    skip
                    <Icon className="border px-2 py-1 rounded-full text-sm">2</Icon>
                </Button>
            </div>

            {/* OPTIONS  */}

            <ul className="max-h-14 flex justify-between gap-2 text-xs">
                {options.map(option => (
                    <li
                        key={option}
                        className={`px-2 py-4 w-20 grid place-items-center
                        rounded-lg 
                        ${option === "don't know" && "bg-red-700/30"}
                        ${option === "not sure" && "bg-yellow-700/30"}
                        ${option === "I know" && "bg-green-700/30"}
                        `}
                        onClick={handleShowClick}
                    >
                        {option}
                    </li>
                ))}
            </ul>
        </div>
    );
}

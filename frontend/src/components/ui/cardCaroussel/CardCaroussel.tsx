import { useState } from "react";
import { FlashcardProp } from "../../../types/flashcard";
import Line from "../shapes/Line";

type CardCarousselProps = {
    flashcards: FlashcardProp[];
    className: string;
    showBack: boolean;
};

export default function CardCaroussel({ flashcards, showBack, className }: CardCarousselProps) {
    const [index, setIndex] = useState<number>(0);
    if (!flashcards || !flashcards.length) {
        return <p>Flashcard couldn't be retrieved.</p>;
    }

    const { front_title, front_text, back_title, back_text, createdAt, updatedAt } = flashcards[index];

    function handleSkipClick() {
        setIndex(prev => (prev + 1) % flashcards.length);
    }

    const spanFullCardHeight = "h-full grow grid place-content-center";

    // INFO: Flashcard Variants: (1) Space only for question (2) Indicates length of answer
    return (
        <>
            {!flashcards.length || !flashcards ? (
                "Flashcard could not be retrieved."
            ) : (
                <div
                    className={`min-h-24 py-2 flex flex-col
                                shadow-line rounded-lg overflow-hidden ${className}`}
                >
                    {/* FRONT-SIDE */}
                    <div className={`py-2 ${!showBack ? spanFullCardHeight : ""}`}>
                        <h1>{front_title}</h1>
                        <p>{front_text}</p>
                    </div>

                    {/* BACK-SIDE */}
                    <div className={`${!showBack ? "hidden" : "animate-fadeIn"}`}>
                        <Line
                            lineBox="h-6 grid place-items-center"
                            lineStyle="w-5/6 border-t border-slate-400"
                        />
                        <div className="py-2">
                            <div className={`${!showBack ? "hidden" : ""}`}>
                                <h1>{back_title}</h1>
                                <p>{back_text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

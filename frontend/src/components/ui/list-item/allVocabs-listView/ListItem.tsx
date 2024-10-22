import { FlashcardProp } from "../../../../types/flashcard";
import { MdOutlineDeleteOutline } from "react-icons/md";
import * as FlashcardApi from "../../../../network/flashcard_apis";
import useFlashcardsStore from "../../../../store/flashcardStore";

type ListItemProp = {
    flashcard: FlashcardProp;
};

export default function ListItem({ flashcard }: ListItemProp) {
    const { front_title, back_title, _id, stack } = flashcard;
    const removeFromStore = useFlashcardsStore(state => state.removeFlashcardStore);

    const cardID = (_id: string) => {
        const result = _id.slice(_id.length - 3);
        return result;
    };

    const stackID = (stack: string) => {
        if (!stack) return "N/A";
        return stack.slice(stack.length - 3);
    };

    const handleDeleteFlashcard = async (flashcard: FlashcardProp) => {
        const id = flashcard._id;

        try {
            await FlashcardApi.deleteFlashcard(id);
            removeFromStore(id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <li className={`relative w-full h-8 grid grid-cols-12 gap-y-3 items-center`}>
                <p className="col-span-4 flex-row">{front_title}</p>
                <p className="col-span-3 flex-row text-xs">{`ID: ${cardID(_id)}`}</p>
                <p className="col-span-4 text-xs">{`Stack: ${stackID(stack)}`}</p>
                {/* <p className="col-span-4">{back_title}</p> */}
                <MdOutlineDeleteOutline
                    className="col-span-1 cursor-pointer"
                    onClick={e => {
                        handleDeleteFlashcard(flashcard);
                        e.stopPropagation();
                    }}
                />
                <div className="absolute border-b bottom-1 w-full" />
            </li>
        </>
    );
}

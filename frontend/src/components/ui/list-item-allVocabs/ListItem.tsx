import { FlashcardProp } from "../../../types/flashcard";
import { MdOutlineDeleteOutline } from "react-icons/md";
import * as FlashcardApi from "../../../network/flashcard_apis";
import useFlashcardsStore from "../../../store/flashcardStore";

type ListItemProp = {
  flashcard: FlashcardProp;
};

export default function ListItem({ flashcard }: ListItemProp) {
  const { front_title, back_title } = flashcard;
  const removeFromStore = useFlashcardsStore((state) => state.removeFlashcardStore);

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
        <p className="col-span-4 ">{front_title}</p>
        <p className="col-span-7">{back_title}</p>
        <MdOutlineDeleteOutline
          className="col-span-1 cursor-pointer"
          onClick={(e) => {
            handleDeleteFlashcard(flashcard);
            e.stopPropagation();
          }}
        />
      </li>
      <div className="absolute border-b w-full" />
    </>
  );
}

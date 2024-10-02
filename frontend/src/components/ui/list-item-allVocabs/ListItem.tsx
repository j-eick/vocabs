import { FlashcardProp } from "../../../types/flashcard";
import { MdOutlineDeleteOutline } from "react-icons/md";

type ListItemProp = {
  flashcard: FlashcardProp;
};

export default function ListItem({ flashcard }: ListItemProp) {
  const { front_title, back_title } = flashcard;

  const removeVocabHandler = () => {};

  return (
    <div className="relative">
      <li className={`relative w-full h-8 grid grid-cols-12 gap-y-3 items-center`}>
        <p className="col-span-4 ">{front_title}</p>
        <p className="col-span-7">{back_title}</p>
        <MdOutlineDeleteOutline className="col-span-1" onClick={removeVocabHandler} />
      </li>
      <div className="absolute border-b w-full" />
    </div>
  );
}

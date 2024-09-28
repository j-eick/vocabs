import { FlashcardProp } from "../../../types/flashcard";

type ListItemProp = {
  flashcard: FlashcardProp;
};

export default function ListItem({ flashcard }: ListItemProp) {
  const { front_title, back_title } = flashcard;

  return (
    <li className="grid grid-cols-12 gap-y-2 border-b border-slate-300">
      <p className="col-span-4 ">{front_title}</p>
      <p className="col-span-8">{back_title}</p>
    </li>
  );
}

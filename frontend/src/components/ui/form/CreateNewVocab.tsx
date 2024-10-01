import { useRef, useState } from "react";
import useFlashcardsStore from "../../../store/flashcardStore";
import { useClickOutside } from "../../../utils/clickOutside";

type NewFlashcard = {
  front_title: string;
  front_text: string;
  back_title: string;
  back_text: string;
};

type CreateNewVocab = {
  onClickOutside: () => void;
};

export default function CreateNewVocab({ onClickOutside }: CreateNewVocab) {
  const addToFlashcardStore = useFlashcardsStore((state) => state.addToFlashcardStore);
  const [newFlashcard, setNewFlashcard] = useState<NewFlashcard>({
    front_title: "",
    front_text: "",
    back_title: "",
    back_text: "",
  });

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, onClickOutside);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // const formData = new FormData(e.currentTarget);
    // const formObj = Object.fromEntries(formData.entries());

    // console.log(formObj);

    try {
      const res = await fetch("http://localhost:3000/api/vocabs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newFlashcard),
      });

      if (res.ok) {
        const newCard = await res.json();
        addToFlashcardStore(newCard);
        // reset input field
        setNewFlashcard({
          front_title: "",
          front_text: "",
          back_title: "",
          back_text: "",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const inputFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewFlashcard((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div ref={ref}>
      <form
        onSubmit={(e) => handleSubmit(e)}
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
          onChange={(e) => inputFieldHandler(e)}
          className="border-2"
        />
        <label htmlFor="frontDescription">Front Description </label>
        <input
          id="frontDescription"
          type="text"
          name="front_text"
          value={newFlashcard.front_text}
          onChange={(e) => inputFieldHandler(e)}
          className="border-2"
        />
        <label htmlFor="backTitle">Back Title</label>
        <input
          id="backTitle"
          type="text"
          name="back_title"
          value={newFlashcard.back_title}
          onChange={(e) => inputFieldHandler(e)}
          className="border-2"
        />
        <label htmlFor="backDescription">Back Description</label>
        <input
          id="backDescription"
          type="text"
          name="back_text"
          value={newFlashcard.back_text}
          onChange={(e) => inputFieldHandler(e)}
          className="border-2"
        />
        <button type="submit" className="bg-slate-300 mt-4 p-2 cursor-pointer">
          Create Vocab
        </button>
      </form>
    </div>
  );
}
import "./App.css";
import { useState } from "react";
import useFlashcardsStore from "./store/flashcardStore";
import Header from "./components/ui/header/header";
import { FlashcardProp } from "./types/flashcard";

type NewFlashcard = {
  front_title: string;
  front_text: string;
  back_title: string;
  back_text: string;
};

export default function App() {
  const addToFlashcardStore = useFlashcardsStore((state) => state.addToFlashcardStore);
  const allFlashcards = useFlashcardsStore((state) => state.allFlashcards);
  const [newFlashcard, setNewFlashcard] = useState<NewFlashcard>({
    front_title: "",
    front_text: "",
    back_title: "",
    back_text: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
    console.log(newFlashcard);
  };

  return (
    <main className="w-screen h-screen">
      <Header />
      <section className="w-5/6 mx-auto my-0 mt-5">
        <LatestVocab flashcards={allFlashcards} />
      </section>
      <section className="w-5/6 mx-auto my-0">
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
      </section>
    </main>
  );

  type LatestVocabProps = {
    flashcards: FlashcardProp[];
  };
  //TODO: turn this into a caroussel.
  function LatestVocab({ flashcards }: LatestVocabProps) {
    // grabbing last 3 indexes of allFlashcard-array
    const lastThreeEntries = flashcards.slice(flashcards.length - 3, flashcards.length);

    return (
      <div className="mx-auto my-0 text-left border-2">
        <p>last 3 entries</p>
        <ul role="list" className="border border-slate-600">
          {lastThreeEntries.map((entry) => (
            <li>{entry.front_title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

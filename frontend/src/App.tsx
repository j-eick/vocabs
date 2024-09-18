import "./App.css";
import { useEffect, useState } from "react";
import { Flashcard } from "./components/flashcard";
import { FlashcardProp } from "./types/flashcard";
import { NavLink } from "react-router-dom";
import * as FlashcardApi from "./network/flashcard_apis";

type NewFlashcard = {
  front_title: string;
  front_text?: string;
  back_title?: string;
  back_text?: string;
};

export default function App() {
  const [flashcards, setFlashcards] = useState<FlashcardProp[]>([]);
  const [newFlashcard, setNewFlashcard] = useState<NewFlashcard>({
    front_title: "",
    front_text: "",
    back_title: "",
    back_text: "",
  });

  useEffect(() => {
    async function fetchCards() {
      const fetchedCards = await FlashcardApi.fetchFlashcards();
      setFlashcards(fetchedCards);
      console.log(fetchedCards);
    }
    fetchCards();
  }, []);

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

        setNewFlashcard({
          front_title: "",
          front_text: "",
          back_title: "",
          back_text: "",
        });
        setFlashcards((prev) => [...prev, newCard]);
        return newCard;
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
    <>
      <nav>
        <ul className="mt-2 mb-2 flex justify-evenly">
          <li>
            <NavLink to="/">Study</NavLink>
          </li>
          <li>
            <NavLink to="/allVocabs">My Vocabs</NavLink>
          </li>
        </ul>
      </nav>
      <ul role="list" className="border-">
        {flashcards.map((card: FlashcardProp) => (
          <li key={card._id} className="">
            <Flashcard flashcard={card} />
          </li>
        ))}
      </ul>
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
    </>
  );
}

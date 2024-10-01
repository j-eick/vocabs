import "./App.css";
import { useState } from "react";
import useFlashcardsStore from "./store/flashcardStore";
import Header from "./components/ui/header/Header";
import { FlashcardProp } from "./types/flashcard";
import FormModal_blurredBg from "./components/ui/modal/Form_ModalblurredBg";

// type NewFlashcard = {
//   front_title: string;
//   front_text: string;
//   back_title: string;
//   back_text: string;
// };

export default function App() {
  // const addToFlashcardStore = useFlashcardsStore((state) => state.addToFlashcardStore);
  const allFlashcards = useFlashcardsStore((state) => state.allFlashcards);
  // const [newFlashcard, setNewFlashcard] = useState<NewFlashcard>({
  //   front_title: "",
  //   front_text: "",
  //   back_title: "",
  //   back_text: "",
  // });
  const [showDialog, setShowDialog] = useState(false);
  const [showCreateVocabButton, setShowCreateVocabButton] = useState(true);

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   // const formData = new FormData(e.currentTarget);
  //   // const formObj = Object.fromEntries(formData.entries());

  //   // console.log(formObj);

  //   try {
  //     const res = await fetch("http://localhost:3000/api/vocabs", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newFlashcard),
  //     });

  //     if (res.ok) {
  //       const newCard = await res.json();
  //       addToFlashcardStore(newCard);
  //       // reset input field
  //       setNewFlashcard({
  //         front_title: "",
  //         front_text: "",
  //         back_title: "",
  //         back_text: "",
  //       });
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // const inputFieldHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;

  //   setNewFlashcard((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  // useEffect(() => {
  //   console.log(newFlashcard);
  // });

  return (
    <main className="relative w-screen h-screen">
      <Header />
      <FormModal_blurredBg show={showDialog} onClickOutside={() => setShowDialog(false)} />
      {/* DASHBOARD ITEMS */}
      <section className="relative w-5/6 mx-auto my-0 mt-5">
        <LatestVocab flashcards={allFlashcards} />
      </section>

      {/* <section className="relative w-5/6 mx-auto my-0 border-2">
        
      </section> */}
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
            <li key={entry._id}>{entry.front_title}</li>
          ))}
        </ul>
      </div>
    );
  }
}

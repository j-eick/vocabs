import { create } from "zustand";

interface ButtonProps {
  ShowAddFlashcardButton: boolean;
  // CreateNewVocab_Show: () => void;
  // CreateNewVocab_Hide: () => void;
  setAddFlashcardButton: (input: boolean) => void;
}

const useButtonStore = create<ButtonProps>()((set) => ({
  ShowAddFlashcardButton: true,
  // CreateNewVocab_Show: () => set(() => ({ CreateNewVocab: true })),
  // CreateNewVocab_Hide: () => set(() => ({ CreateNewVocab: false })),
  setAddFlashcardButton: (state) => set(() => ({ ShowAddFlashcardButton: state })),
}));

export default useButtonStore;

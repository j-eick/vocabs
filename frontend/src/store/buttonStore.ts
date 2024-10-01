import { create } from "zustand";

interface ButtonProps {
  NewVocabButton_State: boolean;
  // CreateNewVocab_Show: () => void;
  // CreateNewVocab_Hide: () => void;
  ShowNewVocabButton: (input: boolean) => void;
}

const useButtonStore = create<ButtonProps>()((set) => ({
  NewVocabButton_State: true,
  // CreateNewVocab_Show: () => set(() => ({ CreateNewVocab: true })),
  // CreateNewVocab_Hide: () => set(() => ({ CreateNewVocab: false })),
  ShowNewVocabButton: (state) => set(() => ({ NewVocabButton_State: state })),
}));

export default useButtonStore;

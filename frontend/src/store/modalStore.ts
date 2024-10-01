import { create } from "zustand";

interface ModalProps {
  NewVocabFormModal_State: boolean;
  ShowNewVocabModal: (input: boolean) => void;
}

const useModalStore = create<ModalProps>()((set) => ({
  NewVocabFormModal_State: false,
  ShowNewVocabModal: (state) => set(() => ({ NewVocabFormModal_State: state })),
}));

export default useModalStore;

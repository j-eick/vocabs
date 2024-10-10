import { create } from "zustand";

interface ModalProps {
  // Form: New Vocab
  NewVocabFormModal_State: boolean;
  ShowNewVocabModal: (state: boolean) => void;

  // INFO MODAL
  ShowInfoModal: boolean;
  setShowInfoModal: (state: boolean, duration?: number) => void;
}

const useModalStore = create<ModalProps>()((set) => ({
  // Form: New Vocab
  NewVocabFormModal_State: false,
  ShowNewVocabModal: (state) => set(() => ({ NewVocabFormModal_State: state })),

  // INFO MODAL
  ShowInfoModal: false,
  setShowInfoModal: (state, duration) => {
    set(() => ({ ShowInfoModal: state }));

    if (duration) {
      setTimeout(() => {
        set(() => ({ ShowInfoModal: false }));
      }, duration * 1000);
    }
  },
}));

export default useModalStore;

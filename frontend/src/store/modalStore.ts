import { create } from "zustand";

interface ModalProps {
    // Form: New Vocab
    ShowFlashcardFormModal: boolean;
    setFlashcardFormModal: (state: boolean) => void;

    // INFO MODAL
    ShowInfoModal: boolean;
    setShowInfoModal: (state: boolean, duration?: number) => void;
}

const useModalStore = create<ModalProps>()(set => ({
    // Form: New Vocab
    ShowFlashcardFormModal: false,
    setFlashcardFormModal: state => set(() => ({ ShowFlashcardFormModal: state })),

    // INFO MODAL
    ShowInfoModal: false,
    setShowInfoModal: (state, duration) => {
        setTimeout(() => {
            set(() => ({ ShowInfoModal: state }));
        }, 500);

        if (duration) {
            setTimeout(() => {
                set(() => ({ ShowInfoModal: false }));
            }, duration * 2200);
        }
    },
}));

export default useModalStore;

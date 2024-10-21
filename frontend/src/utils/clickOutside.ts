import { RefObject, useEffect } from "react";
import useButtonStore from "../store/buttonStore";

export const useClickOutside = (ref: RefObject<HTMLElement | undefined>, callback: () => void) => {
    const { setAddFlashcardButton } = useButtonStore(state => state);

    const handleClick = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
            callback();
            setAddFlashcardButton(true);
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });
};

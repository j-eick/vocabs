import { RefObject, useEffect } from "react";
import useButtonStore from "../store/buttonStore";

export const useClickOutside = (ref: RefObject<HTMLElement | undefined>, callback: () => void) => {
    const { setAddFlashcardButton } = useButtonStore(state => state);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
                callback();
                console.log("outside");
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });
};

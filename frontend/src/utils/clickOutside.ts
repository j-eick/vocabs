import { RefObject, useEffect } from "react";

export const useClickOutside = (
    ref: RefObject<HTMLElement | HTMLDivElement | HTMLLIElement | HTMLUListElement | undefined>,
    callback: () => void
) => {
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
                callback();
                console.log("outside");
            } else {
                console.log("inside");
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("click", handleClick);
        };
    });
};

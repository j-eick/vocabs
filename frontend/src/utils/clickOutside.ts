import { RefObject, useEffect } from "react";
import useButtonStore from "../store/buttonStore";

export const useClickOutside = (ref: RefObject<HTMLElement | undefined>, callback: () => void) => {
  const showNewVocabButton = useButtonStore((state) => state.ShowNewVocabButton);
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
      callback();
      showNewVocabButton(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

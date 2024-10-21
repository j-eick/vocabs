import { ReactElement, ReactNode, useMemo, useRef } from "react";
import { twMerge } from "tailwind-merge";
import { useClickOutside } from "../../../utils/clickOutside.ts";

type BlurredModalProps = {
    content: ReactElement;
    className?: string;
    trigger?: ReactNode;
    blur?: "smm" | "smmm" | "lg";
    brightness?: "80" | "90" | "95";
    color?: "blue";
    onClickOutside?: () => void;
    show?: boolean;
};

export const BlurredModal = ({
    content,
    blur = "lg",
    brightness,
    color,
    className,
    show = true,
    onClickOutside,
}: BlurredModalProps) => {
    const ref = useRef<HTMLElement>(null);

    // todo: "Uncaught TypeError: callback is not a function"
    // BUT IT WORKS!!!
    useClickOutside(ref, onClickOutside); // onClickOutside is set to optional; that's why squiggly line

    const blurIntensity = useMemo(() => {
        switch (blur) {
            case "smm":
                return "backdrop-blur-smm";

            case "smmm":
                return "backdrop-blur-smmm";

            case "lg":
                return "backdrop-blur-lg";
        }
    }, []);

    const backdropBrightness = useMemo(() => {
        switch (brightness) {
            case "80":
                return "backdrop-brightness-80";

            default:
                return "backdrop-brightness-90";
        }
    }, []);

    const backdropColor = useMemo(() => {
        switch (color) {
            case "blue":
                return "bg-blue-400/20";

            default:
                return "";
        }
    }, []);

    return (
        show && (
            <div
                ref={ref}
                className={twMerge(
                    `px-4 py-3 
                ${blurIntensity} ${backdropBrightness} ${backdropColor} ${className} `
                )}
            >
                {content}
            </div>
        )
    );
};

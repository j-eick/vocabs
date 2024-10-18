import { ReactNode, useMemo } from "react";
import { twMerge } from "tailwind-merge";

type BottomModalProps = {
    content: ReactNode;
    className: string;
    position: "left" | "center" | "right";
};

export default function BottomModal({ content, position, className }: BottomModalProps) {
    const pos = useMemo(() => {
        switch (position) {
            case "center":
                return "";

            default:
                return "";
        }
    }, []);

    return (
        <div className={twMerge(`fixed  w-full`)}>
            <div className={`w-max px-4 py-2 ${pos} ${className}`}>{content}</div>
        </div>
    );
}

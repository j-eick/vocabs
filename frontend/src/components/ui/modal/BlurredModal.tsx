import { ReactElement, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type BlurredModalProps = {
    content: ReactElement;
    className?: string;
    trigger?: ReactNode;
};

export default function BlurredModal({ content, className }: BlurredModalProps) {
    return (
        <div
            className={twMerge(
                `px-4 py-3 
                backdrop-blur-lg backdrop-brightness-90 ${className} border-none`
            )}
        >
            {content}
        </div>
    );
}

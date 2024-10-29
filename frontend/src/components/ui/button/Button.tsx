import { ReactNode, useEffect } from "react";

type ButtonProps = {
    children: ReactNode;
    onClick?: () => void;
    wrapper?: string | null;
    disabled?: boolean;
    className?: string;
};

/**
 *
 * @param wrapper: if set, places div around button to control the surrounding space
 * @returns
 */
export default function Button({ onClick, wrapper = "", children, disabled, className }: ButtonProps) {
    useEffect(() => {
        console.log(wrapper);
    }, []);
    return wrapper ? (
        <div className={`${wrapper}`}>
            <button
                onClick={onClick}
                className={`${className}`}
                disabled={disabled}
            >
                {children}
            </button>
        </div>
    ) : (
        <button
            onClick={onClick}
            className={`w-max ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}

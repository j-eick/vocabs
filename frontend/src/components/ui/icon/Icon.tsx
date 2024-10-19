import { IconType } from "react-icons";

type IconProps = {
    icon: IconType;
    className?: string;
    onClick?: (e: MouseEvent) => void;
};

export default function Icon({ icon: Icon, onClick, className }: IconProps) {
    return (
        <Icon
            className={className}
            onClick={onClick}
        />
    );
}

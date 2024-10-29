import { IconType } from "react-icons";

type IconProps = {
    icon?: IconType;
    className?: string;
    onClick?: (e: React.MouseEvent<SVGElement | HTMLElement>) => void;
    children?: string | null;
};

/**
 * Icon component
 * - 2 ways to use this:
 *   1. Pass a Reactnode as child: `<Icon> some text </Icon`
 *   2. Pass a prop of type icon: `<Icon icon = { <AiFillAudio /> } />`
 *
 * @param icon
 * @param className
 * @param onCLick
 * @param children
 * @returns
 */
export default function Icon({ icon: Icon, children, onClick, className }: IconProps) {
    return Icon ? (
        <Icon
            className={className}
            onClick={onClick}
        />
    ) : (
        <div
            className={className}
            onClick={onClick}
        >
            {children}
        </div>
    );
}

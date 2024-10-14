import { NavLink } from "react-router-dom";

type NavObject = {
    path: string;
    name: string;
    active: boolean;
};

type NavProps = {
    navItems: NavObject[];
    path?: string;
};

export default function Nav({ navItems, path }: NavProps) {
    return (
        <ul className="h-11 w-full px-4 fixed bottom-0 flex justify-between bg-slate-300">
            {navItems.map(navItem => (
                <li
                    key={navItem.name}
                    className="relative pt-1 flex flex-col text-sm"
                >
                    {navItem.active ? (
                        <NavLink
                            to={navItem.path}
                            className="h-1/2 text-gray-200"
                        >
                            {navItem.name}
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1/2">
                                <span className="text-xl text-zinc-100">•</span>
                            </div>
                        </NavLink>
                    ) : (
                        <NavLink
                            to={navItem.path}
                            className="h-1/2"
                        >
                            {navItem.name}
                            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1/2"></div>
                        </NavLink>
                    )}
                </li>
            ))}
        </ul>
    );
}

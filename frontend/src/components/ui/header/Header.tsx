import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <nav className="h-14 grid place-items-center bg-slate-200">
      <ul className="w-full flex justify-evenly">
        <li>
          <NavLink to="/">Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/study">Study</NavLink>
        </li>
        <li>
          <NavLink to="/allVocabs">My Vocabs</NavLink>
        </li>
      </ul>
    </nav>
  );
}

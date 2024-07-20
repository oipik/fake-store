import { memo } from "react";
import { NavLink } from "react-router-dom";

interface INavItemProps {
  text: string | React.FC;
  link: string;
}

const NavItem: React.FC<INavItemProps> = memo(({ text, link }) => {
  return (
    <li
      className={`cursor-pointer font-semibold border-default hover:text-default transition-all duration-100`}>
      <NavLink
        to={link}
        className={({ isActive }) => isActive ? "border-b-2 text-default border-default" : ""}>
        {text}
      </NavLink>
    </li>
  )
})

export default NavItem;
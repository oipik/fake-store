import { NavLink } from "react-router-dom";

const NavItem = ({ text, link }) => {
  const setActive = ({isActive}) => isActive ? "border-b-2 text-default border-default" : "";

  return (
    <li className={`cursor-pointer font-semibold border-default hover:text-default transition-all duration-100`}>
      <NavLink to={link}
        className={setActive}>
        {text}
      </NavLink>
    </li>
  )
}

export default NavItem
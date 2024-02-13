
const NavItem = ({ text }) => {
  const underline = typeof text === 'string' ? "hover:border-b-2" : null; 
  return (
    <li className={`cursor-pointer font-semibold border-default hover:text-default transition-all duration-100 ${underline}`}>
      <a href="#">
        {text}
      </a>
    </li>
  )
}

export default NavItem
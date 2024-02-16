import NavItem from "../nav-item/NavItem"
import cart from '../../images/cart.png';

import { useSelector } from "react-redux";

const Cart = () => {
  const total = useSelector(state => state.cart.total);

  return (
    <div className="relative bg-default rounded-full w-8 h-8 flex justify-center items-center hover:bg-opacity-50 transition-all duration-100">
      <img src={cart} alt="cart" />
      {
        total > 0 ? <span className="text-zinc-700 absolute -left-1 -bottom-2 bg-red-400 rounded-full w-5 h-5 flex justify-center items-center">{total}</span> : null
      }
    </div>
  )
}

const Header = () => {

  return (
    <header className="flex justify-between items-center mb-6">
      <div className=" text-default font-bold">
        FAKE STORE
      </div>
      <nav>
        <ul className="flex space-x-4 items-center">
          <NavItem text="Home" link="/" />
          <NavItem text="About" link="/about" />
          <NavItem text="Products" link="/products" />
          <NavItem text="Contacts" link="/contacts" />
          <NavItem text={Cart()} link="/cart" />
        </ul>
      </nav>
    </header>
  )
}

export default Header
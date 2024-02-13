import NavItem from "../nav-item/NavItem"
import cart from '../../images/cart.png';

const Cart = () => {
  return (
    <div className=" bg-default rounded-full w-8 h-8 flex justify-center items-center hover:bg-opacity-50 transition-all duration-100">
      <img src={cart} alt="cart" />
    </div>
  )
}

const Header = () => {

  return (
    <header className="flex justify-between items-center">
      <div className=" text-default font-bold">
        FAKE STORE
      </div>
      <nav>
        <ul className="flex space-x-4 items-center">
          <NavItem text="Home" />
          <NavItem text="About" />
          <NavItem text="Products" />
          <NavItem text="Contacts" />
          <NavItem text={Cart()} />
        </ul>
      </nav>
    </header>
  )
}

export default Header
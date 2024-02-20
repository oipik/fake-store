import NavItem from "../nav-item/NavItem"

const MobileMenu = ({ isOpen = false, Cart }) => {
  return (
    <>
      <div className={`absolute top-0 left-0 right-0 bg-slate-500 opacity-50 z-10 min-h-[150vh] ${isOpen ? 'flex' : 'hidden'}`} />
      <div className={`absolute right-0 top-0 w-1/2 bg-white z-20 justify-center min-h-[150vh] ${isOpen ? 'flex' : 'hidden'}`} >
        <nav className="my-20 mx-5 space-y-5 text-lg w-full">
          <ul className="flex flex-col space-y-5 p-2">
            <NavItem text="Home" link="/" />
            <NavItem text="About" link="/about" />
            <NavItem text="Products" link="/products" />
            <NavItem text="Contacts" link="/contacts" />
            <NavItem text={Cart()} link="/cart" />
          </ul>
        </nav>
      </div>
    </>
  )
}

export default MobileMenu
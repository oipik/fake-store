import NavItem from "../nav-item/NavItem";
import closeMenu from "../../images/icon-close-menu.svg";

interface IMobileMenuProps {
  isOpen?: boolean;
  setMobileMenu: (isOpen: boolean) => void;
  Cart: React.FC;
}

const MobileMenu: React.FC<IMobileMenuProps> = ({ isOpen = false, setMobileMenu, Cart }) => {
  return (
    <>
      <div
        onClick={() => setMobileMenu(!isOpen)}
        className={`fixed top-0 left-0 right-0 bg-slate-500 opacity-50 z-10 w-full h-full 
        ${isOpen ? 'flex' : 'hidden'} block md:hidden`}
      />
      <div
        className={`fixed transition-all duration-1000 right-0 top-0 w-1/2 bg-white z-20 justify-center min-h-[150vh] 
        ${isOpen ? 'translate-x-0' : 'translate-x-full'} block md:hidden`}
      >
        <div className='flex justify-end mt-[25px] mr-4'>
          <img onClick={() => setMobileMenu(!isOpen)} className='w-[25px] h-[25px] cursor-pointer' src={closeMenu} alt="menu" />
        </div>
        <nav className="my-8 mx-5 space-y-5 text-lg w-full">
          <ul className="flex flex-col space-y-5 p-2">
            <NavItem text="Home" link="/" />
            <NavItem text="About" link="/about" />
            <NavItem text="Products" link="/products" />
            <NavItem text="Contacts" link="/contacts" />
            <NavItem text={Cart} link="/cart" />
          </ul>
        </nav>
      </div>
    </>
  )
}

export default MobileMenu;
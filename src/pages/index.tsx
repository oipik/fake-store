import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './home/Home';
import About from './about/About';
import Contacts from './contacts/Contacts';
import Products from './products/Products';
import Product from './product/Product';
import Cart from './cart/Cart';
import Page404 from './page404/Page404';

const Pages: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path='products' element={<Products />} />
        <Route path='products/:id' element={<Product />} />
        <Route path='contacts' element={<Contacts />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<Page404 />} />
      </Route>
    </Routes>
  );
}

export default Pages;

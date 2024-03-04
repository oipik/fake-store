import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Wrapper from "./components/wrapper/Wrapper";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import About from "./components/about/About";
import Products from "./components/products/Products";
import Product from "./components/product/Product"
import Contacts from "./components/contacts/Contacts";
import Cart from "./components/cart/Cart";
import Page404 from "./components/page404/Page404";

function App() {
  return (
    <Router>
      <Wrapper>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} /> 
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<Page404 />} /> 
        </Routes>
      </Wrapper>
    </Router>
  );
}

export default App;

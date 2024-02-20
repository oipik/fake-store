import { useSelector, useDispatch } from "react-redux";
import { removeProduct, updateProduct } from "./cartSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const products = useSelector(state => state.cart.data);
  const currentCart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(currentCart))
 }, [currentCart])

  const handleClick = (id, count, counter) => {
    if (count < 0 && counter === 1) dispatch(removeProduct(id));
    dispatch(updateProduct({ id, count }));
  }

  const renderProducts = (products) => {
    let total = 0;

    const data = products.map(({ id, image, title, price, count }) => {
      total += count * price;
      return count > 0 ? <div key={id} className="mb-5 flex bg-white border border-gray-200 rounded-lg shadow relative">
        <button
          className=" hover:bg-default absolute right-3 top-2 w-6 h-6 rounded-full"
          onClick={() => { dispatch(removeProduct(id)) }}>
          X</button>
        <div className='pt-4 min-w-[200px] px-2 py-2'>
          <img className="h-[170px] w-[180px] object-contain" src={image} alt={title} />
        </div>
        <div className="p-5">
          <h5 className="mb-2 text-sm font-bold text-gray-900 dark:text-white">{title}</h5>
          <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">${price}</p>
          <div className="flex space-x-4 mb-3">
            <button
              onClick={() => handleClick(id, -1, count)}
              className="w-7 h-7 shadow hover:bg-default flex justify-center items-center">-</button>
            <span>{count}</span>
            <button
              onClick={() => handleClick(id, 1)}
              className="w-7 h-7 shadow hover:bg-green-700 flex justify-center items-center">+</button>
          </div>
          <p>Total is: <span className="font-bold">{(count * price).toFixed(2)}$</span></p>
        </div>
      </div> : null
    })

    return (
      <>
        <div className="w-full">
          {data}
        </div>
        <div className="ml-0 md:ml-16 w-full max-h-20 bg-white border border-gray-200 rounded-lg shadow">
          <p className="h-10 font-bold flex justify-center items-center">TOTAL is: {total.toFixed(2)}$</p>
          <Link to="/products" className=" block px-3 py-2 text-sm font-medium text-center text-white bg-default rounded-lg hover:bg-opacity-50">Continue shopping</Link>
        </div>
      </>
    )
  }

  const data = renderProducts(products);

  return (
    <section className="flex flex-col md:flex-row">
      {data}
    </section >
  )
}

export default Cart
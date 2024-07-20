import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/useTypedSelector";
import { ICountExtend, removeProduct, updateProduct } from "../../store/reducers/cart.slice";

const Cart: React.FC = () => {
  const products = useAppSelector(state => state.cart.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(products));
  }, [products])

  const handleUpdateCart = (id: number, number: number, counter?: number) => {
    if (number < 0 && counter === 1) {
      dispatch(removeProduct(id));
    } else {
      const product = products.find(prod => prod.id === id);
      if (product) dispatch(updateProduct({ ...product, count: product.count + number }));
    }
  }

  const renderProducts = (products: ICountExtend[]) => {
    let total = 0;

    const data = products.map(({ id, image, title, price, count }) => {
      total += count * +price;
      return count > 0 ? (
        <div key={id} className="mb-5 flex bg-white border border-gray-200 rounded-lg shadow relative">
          <button
            className=" hover:bg-default absolute right-3 top-2 w-6 h-6 rounded-full"
            onClick={() => { dispatch(removeProduct(id)) }}
          >
            X</button>
          <div className='pt-4 min-w-[200px] px-2 py-2'>
            <img className="h-[170px] w-[180px] object-contain" src={image} alt={title} />
          </div>
          <div className="p-5">
            <h5 className="mb-2 text-sm font-bold text-gray-900 dark:text-white">{title}</h5>
            <p className="mb-2 font-normal text-gray-700 dark:text-gray-400">${price}</p>
            <div className="flex space-x-4 mb-3">
              <button
                onClick={() => handleUpdateCart(id, -1, count)}
                className="w-7 h-7 shadow hover:bg-default flex justify-center items-center">-</button>
              <span>{count}</span>
              <button
                onClick={() => handleUpdateCart(id, 1)}
                className="w-7 h-7 shadow hover:bg-green-700 flex justify-center items-center">+</button>
            </div>
            <p>Total is: <span className="font-bold">{(count * +price).toFixed(2)}$</span></p>
          </div>
        </div>
      ) : null
    })

    return (
      <>
        <div className="w-full">
          {data}
        </div>
        <div className="ml-0 md:ml-16 w-full max-h-20 bg-white border border-gray-200 rounded-lg shadow">
          <p className="h-10 font-bold flex justify-center items-center">TOTAL is: {total.toFixed(2)}$</p>
          <Link
            to="/products"
            className=" block px-3 py-2 text-sm font-medium text-center text-white bg-default rounded-lg hover:bg-opacity-50"
          >
            Continue shopping
          </Link>
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

export default Cart;
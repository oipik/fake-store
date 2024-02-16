import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

import Rating from "../Rating";
import { fetchProduct } from "./productSlice";
import { addProduct, updateProduct } from '../cart/cartSlice';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { product, productLoadingStatus } = useSelector(state => state.product)
  const products = useSelector(state => state.products.products);

  const cart = useSelector(state => state.cart.data);
  const dispatch = useDispatch()

  const { title, image, price, description, rating } = product;

  useEffect(() => {
    dispatch(fetchProduct(id));
  }, [])

  const handleClick = (id) => {
    const cartProduct = cart.find(item => item.id === +id);
    const count = 1;

    if (cartProduct) {
      dispatch(updateProduct({id, count}))
    } else {
      const prod = products.find(item => item.id === +id);
      dispatch(addProduct({...prod, count: 1}));
    }
  }

  if (productLoadingStatus === "loading") {
    return <div className='flex justify-center'>Loading...</div>
  } else if (productLoadingStatus === "error") {
    return <div className='flex justify-center'>Error</div>
  }

  const rate = rating?.rate !== undefined ? rating.rate : 0;

  return (
    <section>
      <button
        className="mb-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-default rounded-lg hover:bg-opacity-50"
        onClick={() => navigate(-1)}>
        Вернуться назад
      </button>
      <div className="flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className='pt-4 min-w-[200px] px-2 py-2'>
          <img className="rounded-t-lg h-[200px] w-[210px] object-contain" src={image} alt={title} />
        </div>
        <div className="p-5">
          <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
          <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">${price}</p>
          <Rating rating={rate} />
          <p className="my-2">{description}</p>
          <button
            onClick={() => handleClick(id)}
            className="px-3 py-2 text-sm font-medium text-center text-white bg-default rounded-lg hover:bg-opacity-50">
            Add to cart
          </button>
        </div>
      </div>

    </section>
  )
}

export default Product
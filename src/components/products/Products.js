import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom"
import { fetchProducts } from './productsSlice';
import { addProduct, selectAll, updateProduct } from '../cart/cartSlice';
import Rating from '../Rating';
import Filters from './filter';

const Products = () => {
  const dispatch = useDispatch();
  const { products, productsLoadingStatus, activeFilter } = useSelector(state => state.products);
  const cart = useSelector(selectAll);

  useEffect(() => {
    if (Object.keys(products).length === 0) {
      dispatch(fetchProducts());
    }
  }, [])

  if (productsLoadingStatus === "loading") {
    return <div className='flex justify-center'>Loading...</div>
  } else if (productsLoadingStatus === "error") {
    return <div className='flex justify-center'>Error</div>
  }

  const handleClick = (id) => {
    const cartProduct = cart.find(item => item.id === id);

    if (cartProduct) {
      dispatch(updateProduct({ ...cartProduct, count: cartProduct.count + 1 }))
    } else {
      const prod = products.find(item => item.id === id);
      dispatch(addProduct({ ...prod, count: 1 }));
    }
  }

  const renderData = (data) => {
    return data.filter((item) => {
      if (activeFilter === item.category) {
        return item;
      } else if (activeFilter === "All") {
        return item;
      }
    })
      .map(({ id, image, title, price, rating }) => {
        return (
          <div key={id} className=" relative max-w-[300px] h-[350px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Link to={`/products/${id}`} className='flex flex-wrap'>
              <div className='pt-4 mx-auto'>
                <img className="rounded-t-lg h-[150px] w-[180px] object-contain" src={image} alt={title} />
              </div>
              <div className="p-5 w-full">
                <h5 className="mb-1 text-sm font-bold tracking-tight text-gray-900 dark:text-white">{title.length <= 55 ? title : title.substring(0, 55) + '...'}</h5>
                <div className='mb-3 flex justify-between'>
                  <p className="text-gray-700 dark:text-gray-400">${price}</p>
                  <Rating rating={rating.rate} />
                </div>
              </div>
            </Link>
            <button
              className="absolute bottom-5 left-5 px-3 py-2 text-sm font-medium text-center text-white bg-default rounded-lg hover:bg-opacity-50"
              onClick={() => handleClick(id)}>
              Add to cart
            </button>
          </div>
        )
      })
  }

  const data = renderData(products);

  return (
    <section className=''>
      <div>
        <Filters />
      </div>
      <div className='flex flex-wrap gap-10 justify-center'>
        {data}
      </div>

    </section>
  )
}

export default Products
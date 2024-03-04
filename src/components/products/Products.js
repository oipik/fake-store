import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom"
import { fetchProducts } from './productsSlice';
import { addProduct, selectAll, updateProduct } from '../cart/cartSlice';
import Rating from '../Rating';
import Filter from './Filter';

const Products = () => {
  const [checked, setChecked] = useState(false);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { products, productsLoadingStatus, activeFilter } = useSelector(state => state.products);
  const cart = useSelector(selectAll);

  useEffect(() => {
    if (Object.keys(products).length === 0) {
      dispatch(fetchProducts());
    }
    // eslint-disable-next-line
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
      if (activeFilter === item.category) return item;
      if (activeFilter === "All") return item;
      else return null;
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

  const filterData = (data, search) => {
    if (search === "") return data;
    return data.filter(item => item.title.includes(search));
  }

  const ratingData = checked ? products.filter(({ rating }) => rating.rate >= 4) : products;
  const data = renderData(filterData(ratingData, search));

  return (
    <section>
      <div>
        <Filter />
      </div>
      <div className='md:flex'>
        <div className='max-w-80 w-full md:min-w-80 mr-8 mb-5'>
          <div className='mb-4'>
            <input
              onChange={(e) => setSearch(e.target.value)}
              className='bg-white w-full border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-2 px-4'
              type="text"
              placeholder="Search by category" />
          </div>

          <div>
            <label className="flex items-center" htmlFor="higherfour">
              <input
                onChange={() => setChecked(checked => !checked)}
                className={`w-4 h-4 mr-2`}
                type="checkbox"
                id='higherfour' />
              <span>Рейтинг 4 и выше</span>
            </label>
          </div>
        </div>
        <div className='flex flex-wrap gap-10 justify-center md:justify-normal'>
          {data}
        </div>
      </div>

    </section>
  )
}

export default Products
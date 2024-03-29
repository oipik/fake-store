import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from "react-router-dom"
import { fetchProducts, changeItemOffset, changeCurrentPage } from './productsSlice';
import { addProduct, selectAll, updateProduct } from '../cart/cartSlice';
import Rating from '../Rating';
import Filter from './Filter';
import Paginate from '../paginate/Paginate';

const Products = () => {
  const [checked, setChecked] = useState(false);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const { products, productsLoadingStatus, activeFilter, itemOffset, currentPage, itemsPerPage } = useSelector(state => state.products);
  const cart = useSelector(selectAll);

  const endOffset = itemOffset + itemsPerPage // Кол-во данных на странице
  let pageCount = Math.ceil(products.length / itemsPerPage); // Общее кол-во страниц

  useEffect(() => {
    if (Object.keys(products).length === 0) {
      dispatch(fetchProducts());
    }
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    itemOffset === 0 && dispatch(changeCurrentPage(0));
    // eslint-disable-next-line
  }, [itemOffset])

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

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage);
    dispatch(changeItemOffset(newOffset))
    dispatch(changeCurrentPage(event.selected));
  };

  const renderData = (data) => {
    const getData = data.filter((item) => {
      if (activeFilter === item.category) return item;
      if (activeFilter === "All") return item;
      else return null;
    })

    pageCount = Math.ceil(getData.length / itemsPerPage);

    return getData.slice(itemOffset, endOffset).map(({ id, image, title, price, rating }) => {
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
    const getData = data.filter(item => item.title.includes(search))
    dispatch(changeCurrentPage(0));
    return getData;
  }

  const ratingData = checked ? products.filter(({ rating }) => rating.rate >= 4) : products;
  const data = renderData(filterData(ratingData, search));

  return (
    <section>
      <div>
        <Filter />
      </div>
      <div className='md:flex'>
        <div className='flex items-baseline flex-wrap w-full md:block md:w-0 md:min-w-80 mr-8 mb-5'>
          <div className='mb-4'>
            <input
              onChange={(e) => setSearch(e.target.value)}
              className='bg-white w-full border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 p-2 px-4'
              type="text"
              placeholder="Search by category" />
          </div>
          <div className='ml-3 md:ml-0 '>
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
        <div>
          <div className='flex flex-wrap gap-10 justify-center md:justify-normal'>
            {data}
          </div>
          {data.length !== 0 && <Paginate pageCount={pageCount} currentPage={currentPage} handlePageClick={handlePageClick} />}
        </div>
      </div>
    </section>
  )
}

export default Products
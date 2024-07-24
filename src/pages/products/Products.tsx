import { useState, useEffect } from 'react';
import { useGetProductsQuery } from '../../store/reducers/products.api';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { IProduct } from '../../models/types';
import { useAppDispatch, useAppSelector } from '../../services/useTypedSelector';
import { addProduct, updateProduct } from '../../store/reducers/cart.slice';
import { useDebounce } from '../../services/useDebounce';

import Paginate from '../../components/paginate/Paginate';
import FilterProducts from '../../components/filterProducts/FilterProducts';
import Card from '../../components/card/Card';

const Products: React.FC = () => {
  const [checked, setChecked] = useState(false);
  const [search, setSearch] = useState("");
  const debounce = useDebounce(search, 300);

  const [searchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || '1');
  const productOnPage = 6;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data = [], isLoading, isFetching, isError } = useGetProductsQuery();

  const lastIndex = page * productOnPage;
  const firstIndex = lastIndex - productOnPage;
  let pageCount = Math.ceil(data.length / productOnPage);
  const activeFilter = useAppSelector(state => state.products.activeFilter);
  const cart = useAppSelector(state => state.cart.cart);

  useEffect(() => {
    navigate(`?page=${page}`);
  }, [page, navigate])

  useEffect(() => {
    if (activeFilter !== 'All' || debounce !== "" || checked !== false) navigate(`?page=1`);
    // eslint-disable-next-line
  }, [activeFilter, debounce, checked])

  const handlePageClick = ({ selected }: { selected: number }) => {
    navigate(`?page=${selected + 1}`);
  }

  const handleUpdateCart = (id: number) => {
    const cartProduct = cart.find(item => item.id === id);

    if (cartProduct) {
      dispatch(updateProduct({ ...cartProduct, count: cartProduct.count + 1 }));
    } else {
      const product = data?.find(item => item.id === id);
      if (product) dispatch(addProduct({ ...product, count: 1 }));
    }
  }

  const getProducts = (data: IProduct[]) => {
    const getData = data.filter((product) => {
      if (activeFilter === product.category) {
        return product;
      }
      if (activeFilter === "All") return product;
      else return null;
    })

    pageCount = Math.ceil(getData.length / productOnPage);

    return getData.slice(firstIndex, lastIndex).map((product) => (
      <Card key={product.id} product={product} handleUpdateCart={handleUpdateCart} />
    ))
  }

  const filterData = (data: IProduct[], debounce: string) => {
    if (debounce === "") return data;
    const getData = data.filter(item => item.title.includes(debounce));
    return getData;
  }

  const productsByFilter = checked ? data.filter(({ rating }) => rating.rate >= 4) : data;
  const products = getProducts(filterData(productsByFilter, debounce));

  return (
    <section>
      <div>
        <FilterProducts />
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
        <div className='w-full'>
          <div className='flex flex-wrap gap-10 justify-center md:justify-normal'>
            {isError && <p className='text-4xl dark:text-white w-full text-center'>Ошибка доступа...</p>}
            {isLoading || isFetching ? <p className='text-4xl dark:text-white w-full text-center'>Loading...</p> : products}
          </div>
          {products?.length !== 0 && <Paginate initialPage={page - 1} pageCount={pageCount} handlePageClick={handlePageClick} />}
        </div>
      </div>
    </section>
  )
}

export default Products;

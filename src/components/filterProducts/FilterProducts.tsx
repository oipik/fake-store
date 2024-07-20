import { useAppDispatch, useAppSelector } from '../../services/useTypedSelector';
import { changeActiveFilter } from '../../store/reducers/products.slice';

interface IFilterProducts {
  id: number;
  name: string;
  label: string;
}

const FilterProducts: React.FC = () => {
  const activeFilter = useAppSelector(state => state.products.activeFilter);
  const dispatch = useAppDispatch();

  const filters: IFilterProducts[] = [
    { id: 1, name: "All", label: "All" },
    { id: 2, name: "electronics", label: "Electronics" },
    { id: 3, name: "jewelery", label: "Jewelery" },
    { id: 4, name: "men's clothing", label: "Men" },
    { id: 5, name: "women's clothing", label: "Women" },
  ];

  const handleChangeFilter = (name: string) => {
    dispatch(changeActiveFilter(name));
  }

  return (
    <div className='md:ml-[360px]'>
      {filters.map(({ id, name, label }) => (
        <div
          key={id}
          onClick={() => handleChangeFilter(name)}
          className={`inline-block rounded-3xl px-5 py-2 mb-6 mr-4 cursor-pointer border 
            border-transparent transition-all hover:border-default hover:scale-110 
            ${activeFilter === name ? "bg-default text-white" : "bg-[#f2f2f2]"}`}
        >
          {label}
        </div>
      ))}
    </div >
  )
}

export default FilterProducts;
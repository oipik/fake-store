import { useSelector, useDispatch } from 'react-redux';
import { changeActiveFilter } from './productsSlice';

const Filter = () => {
  const { filters, activeFilter } = useSelector(state => state.products);
  const dispatch = useDispatch();

  return (
    <div className='md:ml-[360px]'>
      {filters.map(({ id, name, label }) => (
        <div
          onClick={() => dispatch(changeActiveFilter(name))}
          className={
          `inline-block rounded-3xl px-5 py-2 mb-6 mr-4 cursor-pointer border border-transparent transition-all hover:border-default hover:scale-110
          ${activeFilter === name ? "bg-default text-white" : "bg-[#f2f2f2]"}`}
          key={id}>{label}</div>
      ))}
    </div>
  )
}

export default Filter;
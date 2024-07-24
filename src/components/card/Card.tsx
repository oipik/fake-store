import { IProduct } from '../../models/types';
import { Link } from 'react-router-dom';
import { memo } from 'react';
import Rating from '../rating/Rating';

interface ICardProps {
  product: IProduct;
  handleUpdateCart: (id: number) => void;
}

const Card: React.FC<ICardProps> = memo(({ product, handleUpdateCart }) => {
  const { id, title, image, rating, price } = product;

  return (
    <div
      className="relative max-w-[300px] h-[350px] bg-white border border-gray-200 rounded-lg 
                  shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/products/${id}`} className='flex flex-wrap'>
        <div className='pt-4 mx-auto'>
          <img className="rounded-t-lg h-[150px] w-[180px] object-contain" src={image} alt={title} />
        </div>
        <div className="p-5 w-full">
          <h5
            className="mb-1 text-sm font-bold tracking-tight text-gray-900 dark:text-white"
          >
            {title.length <= 55 ? title : title.substring(0, 55) + '...'}
          </h5>
          <div className='mb-3 flex justify-between'>
            <p className="text-gray-700 dark:text-gray-400">${price}</p>
            <Rating rating={rating.rate} />
          </div>
        </div>
      </Link>
      <button
        className="absolute bottom-5 left-5 px-3 py-2 text-sm font-medium text-center text-white 
                      bg-default rounded-lg hover:bg-opacity-50"
        onClick={() => handleUpdateCart(+id)}
      >
        Add to cart
      </button>
    </div>
  )
})

export default Card;
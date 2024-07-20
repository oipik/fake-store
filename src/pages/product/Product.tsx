import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../services/useTypedSelector";
import { useGetProductQuery, useGetProductsQuery } from '../../store/reducers/products.api';
import { addProduct, updateProduct } from "../../store/reducers/cart.slice";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Reviews from "../../components/reviews/Reviews";
import Rating from '../../components/rating/Rating';
import Modal from "../../components/modal/Modal";

const Product: React.FC = () => {
  const [showReviews, setShowReviews] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [successSendReview, setSuccessSendReview] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { data: products } = useGetProductsQuery();
  const { data: product, isLoading, isFetching, isError } = useGetProductQuery(id!);

  const cart = useAppSelector(state => state.cart.cart);

  useEffect(() => {
    const timer = setTimeout(() => setSuccessSendReview(!setSuccessSendReview), 2000);
    return () => clearTimeout(timer);
  }, [successSendReview])

  const handleUpdateCart = (id: number) => {
    const cartProduct = cart.find(item => item.id === id);

    if (cartProduct) {
      dispatch(updateProduct({ ...cartProduct, count: cartProduct.count + 1 }));
    } else {
      const product = products?.find(item => item.id === id);
      if (product) dispatch(addProduct({ ...product, count: 1 }));
    }
  }

  return (
    <section>
      <button
        className="mb-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-default rounded-lg hover:bg-opacity-50"
        onClick={() => navigate(-1)}
      >
        Вернуться назад
      </button>
      {
        successSendReview &&
        <div
          className='absolute bg-default text-white w-64 border p-4 top-20 text-center left-2/4 -translate-x-1/2 -translate-y-1/2'
        >
          Спасибо за ваш отзыв!
        </div>
      }
      {isError && <p className='text-4xl dark:text-white w-full text-center'>Ошибка доступа...</p>}
      {isLoading || isFetching ? <p className='text-4xl dark:text-white w-full text-center'>Loading...</p>
        : product && (
          <>
            <div
              className="flex-wrap sm:flex-nowrap max-w-full w-full flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className='mx-auto sm:mx-0 pt-4 min-w-[200px] px-2 py-2'>
                <img className="rounded-t-lg h-[200px] w-[210px] object-contain" src={product.image} alt={product.title} />
              </div>
              <div className="p-5">
                <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">{product.title}</h5>
                <p className="mb-1 font-normal text-gray-700 dark:text-gray-400">${product.price}</p>
                <Rating rating={product.rating.rate} />
                <p className="my-2">{product.description}</p>
                <button
                  onClick={() => handleUpdateCart(+id!)}
                  className="px-3 py-2 text-sm font-medium text-center text-white bg-default rounded-lg hover:bg-opacity-50"
                >
                  Add to cart
                </button>
              </div>
            </div>
            <div className="flex-wrap pb-0 sm:pb-7 sm:flex-nowrap flex justify-between items-center p-7">
              <h2
                className={`order-2 sm:order-1 text-2xl inline-block cursor-pointer border border-transparent transition-all hover:text-default hover:scale-110 ${showReviews && 'text-default'}`}
                onClick={() => setShowReviews(!showReviews)}>Отзывы</h2>
              <button
                onClick={() => setIsModal(prev => !prev)}
                className={`order-1 sm:order-2 relative text-xl cursor-pointer transition-all hover:text-default hover:scale-110
                Цbefore:absolute before:bg-review before:w-5 before:h-5 before:z-10 before:top-1 before:-left-6 hover:before:bg-review-hover`}
              >
                Написать отзыв
              </button>
            </div>
          </>
        )}
      {showReviews && <Reviews productID={id!} />}
      {
        isModal && product ?
          <Portal>
            <Modal product={product} setIsModal={setIsModal} setSuccessSendReview={setSuccessSendReview} />
          </Portal> : null
      }
    </section>
  )
}

interface IPortalProps {
  children: React.ReactNode
}

const Portal: React.FC<IPortalProps> = ({ children }) => {
  let node = document.getElementById('portal');
  if (!node) {
    node = document.createElement('div');
    node.id = 'portal';
    document.body.append(node);
  }

  return ReactDOM.createPortal(children, node);
}

export default Product;

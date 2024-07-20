import { useForm, Controller } from 'react-hook-form';
import { nanoid } from '@reduxjs/toolkit';
import { IProduct } from '../../models/types';
import { useAddReviewMutation } from '../../store/reducers/reviews.api';
import Rating from '../rating/Rating';

interface IModalProps {
  product: IProduct;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccessSendReview: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IData {
  name: string;
  description: string;
  rating: number;
}

const Modal: React.FC<IModalProps> = ({ product, setIsModal, setSuccessSendReview }) => {
  const { register, formState: { errors, isValid }, handleSubmit, reset, control } = useForm<IData>({ mode: 'onBlur' });

  const { title, image, id } = product;
  const [addProduct, { isSuccess, isError }] = useAddReviewMutation();

  const onSubmit = async (data: IData) => {
    const hour = new Date().getHours();
    const minute = new Date().getMinutes();
    const day = new Date().getDate();
    const month = new Date().getMonth() + 1;
    const year = new Date().getFullYear();

    const getChangeDate = (date: number) => (date < 10 ? '0' + date : date);

    const date = `${getChangeDate(hour)}:${getChangeDate(minute)} ${getChangeDate(day)}.${getChangeDate(month)}.${year}`;

    const newReview = {
      id: nanoid(),
      product: id,
      name: data.name,
      date: date,
      description: data.description,
      rating: data.rating,
    };

    addProduct(newReview);
    reset();
  };

  if (isSuccess) {
    setSuccessSendReview(prev => !prev);
    setIsModal(prev => !prev);
  } else if (isError) {
    console.log(isError);
  }

  return (
    <>
      <div
        onClick={() => setIsModal((prev) => !prev)}
        className="fixed w-full h-full left-0 top-0 bg-[#242424] opacity-30"
      />
      <section
        className="z-20 absolute top-1/2 left-1/2 bg-white px-10 pt-7 pb-10 -translate-x-1/2 -translate-y-1/2 rounded-3xl text-[#242424]">
        <div className="flex mb-5">
          <button
            onClick={() => setIsModal((prev) => !prev)}
            className=" hover:bg-default absolute right-3 top-2 w-6 h-6 rounded-full"
          >
            X
          </button>
          <div className="md:flex">
            <h1 className="text-2xl font-bold mr-5">Отзыв к товару {title}</h1>
            <img className="rounded-t-lg h-[100px] w-[100px] object-contain" src={image} alt={title} />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            className="flex-wrap md:flex-nowrap flex justify-start items-center text-lg mb-5"
          >
            <p className="font-semibold max-w-72 w-full">Оцените товар</p>
            <Controller
              name="rating"
              rules={{ required: true }}
              control={control}
              render={({ field }) => {
                const { value = 0, onChange } = field;
                return <Rating rating={value} onChange={(newValue) => onChange(newValue)} />;
              }}
            />
          </div>
          <div className="mb-5">
            <div className="flex-wrap md:flex-nowrap flex justify-start items-center text-lg">
              <p className="font-semibold md:max-w-72 w-full">Ваше имя</p>
              <input
                {...register('name', {
                  required: 'Обязательное поле для заполнения',
                })}
                className="w-full md:w-[65%] border-2 border-[#d3d4dd] rounded-lg text-base py-2.5 px-3.5"
                type="text"
              />
            </div>
            <div
              className={`none ml-0 md:ml-72 text-red-600 ${errors?.name && 'block'}`}>
              {errors?.name && <p>{errors.name.message?.toString()}</p>}
            </div>
          </div>
          <p className="font-semibold w-72 max-w-full text-lg mb-5">Расскажите о товаре</p>
          <textarea
            {...register('description', {
              required: 'Обязательное поле для заполнения',
              minLength: {
                value: 10,
                message: 'Миниммально 10 символов',
              },
            })}
            className="truncate text-base w-full py-3 px-3 border-2 border-[#d3d4dd] rounded-lg h-40 resize-none mb-5 text-wrap"
          />
          <div
            className={`none text-red-600 -mt-5 mb-4 ${errors?.description && 'block'}`}>
            {errors?.description && <p>{errors.description.message?.toString()}</p>}
          </div>
          <button
            disabled={!isValid}
            className={`block w-full px-3 py-2 text-lg font-medium text-center text-white bg-default rounded-lg ${!isValid ? 'bg-opacity-50' : null}`}
            type="submit">
            Отправить
          </button>
        </form>
      </section>
    </>
  );
};

export default Modal;

import { useGetReviewsQuery } from "../../store/reducers/reviews.api";
import { IReview } from "../../models/types";
import { getRandomDate } from "../../services/getRandomDate";

import avatar from "../../images/avatar.png";
import Rating from "../rating/Rating";
import getRandomNumber from "../../services/getRandomNumber";

interface IReviewProps {
  productID: string;
}

const Review: React.FC<IReviewProps> = ({ productID }) => {

  const { data: reviews, isLoading, isFetching, isError } = useGetReviewsQuery(productID);

  const getReviews = (reviews: IReview[]) => {
    const review = reviews.map(({ postId, id, name, email, body }) => {
      return postId === +productID ? <div className="" key={id}>
        <div className="block sm:flex-nowrap m-7 sm:flex justify-between">
          <div className="flex-wrap sm:flex-nowrap flex w-full">
            <img className="w-16 h-16 mr-5" src={avatar} alt="avatar" />
            <div>
              <p className="text-lg font-bold">{name}</p>
              <p>{getRandomDate()}</p>
              <p className="text-wrap">{body}</p>
            </div>
          </div>
          <div className="w-40">{<Rating rating={getRandomNumber(1, 5)} />}</div>
        </div>
        <hr />
      </div> : null
    })
    return review.filter(elem => elem !== null).length !== 0 ? review : <p>Отзывы пока отсутствуют</p>;
  }

  return (
    <section>
      {isError && <p className='text-2xl dark:text-white w-full text-center'>Ошибка доступа...</p>}
      {isLoading || isFetching ? <p className='text-2xl dark:text-white w-full text-center'>Loading...</p> :
        reviews?.length ? getReviews(reviews) : null}
    </section>
  )
}

export default Review;

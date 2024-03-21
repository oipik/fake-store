import avatar from "../../images/avatar.png";
import Rating from "../Rating";

const Review = ({ productID, reviews, showReviews }) => {

  const getReviews = (reviews) => {
    const review = reviews.map(({ product, id, name, date, description, rating }) => {
      return product === +productID ? <article className="" key={id}>
        <div className="block sm:flex-nowrap m-7 sm:flex justify-between">
          <div className="flex-wrap sm:flex-nowrap flex w-full">
            <img className="w-16 h-16 mr-5" src={avatar} alt="avatar" />
            <div>
              <p className="text-lg font-bold">{name}</p>
              <p>{date}</p>
              <p className="text-wrap">{description}</p>
            </div>
          </div>
          <div className="w-40">{<Rating rating={rating} />}</div>
        </div>
        <hr />
      </article> : null
    })
    return review.filter(elem => elem !== null).length !== 0 ? review : <p>Отзывы пока отсутствуют</p>;
  }

  return (
    <section>
      {
        (showReviews && reviews?.length) ? getReviews(reviews) : null
      }
    </section>
  )
}

export default Review
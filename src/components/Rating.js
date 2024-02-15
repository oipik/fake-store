import StarRatings from "react-star-ratings"

const Rating = ({rating = 0}) => {
  return (
    <StarRatings 
    rating={rating}
    starRatedColor="gold"
    numberOfStars={5}
    starDimension="20px"
    name='rating'
    starSpacing="1px"/>
  )
}

export default Rating;
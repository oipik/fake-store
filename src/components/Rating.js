import StarRatings from "react-star-ratings"

const Rating = ({rating, onChange = null}) => {
  return (
    <StarRatings 
    rating={rating}
    starRatedColor="gold"
    numberOfStars={5}
    starDimension={`${onChange !== null ? '30px' : '20px'}`}
    name='rating'
    starSpacing="1px"
    changeRating={onChange !== null ? onChange : null}/>
  )
}

export default Rating;
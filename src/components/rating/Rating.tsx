import { memo } from 'react';
import StarRatings from 'react-star-ratings';

interface IRatingProps {
  rating: number;
  onChange?: (value: number) => void;
}

const Rating: React.FC<IRatingProps> = memo(({ rating, onChange }) => {
  return (
    <StarRatings
      rating={rating}
      starRatedColor="gold"
      numberOfStars={5}
      starDimension={`${onChange ? '30px' : '20px'}`}
      name="rating"
      starSpacing="1px"
      changeRating={onChange} />
  )
});

export default Rating;

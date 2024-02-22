import { useEffect, useState } from 'react';
import { getScotchReviews } from '../api/filteredData';
import ReviewCard from '../components/reviewCard';

export default function Bourbons() {
  const [reviews, setReviews] = useState([]);

  const getAllScotch = () => {
    getScotchReviews().then(setReviews);
  };

  useEffect(() => {
    getAllScotch();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {reviews.map((review) => (
        <ReviewCard key={review.firebaseKey} reviewObj={review} onUpdate={getAllScotch} />
      ))}
    </div>
  );
}

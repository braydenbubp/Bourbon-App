import { useEffect, useState } from 'react';
import { getWhiskeyReviews } from '../api/filteredData';
import ReviewCard from '../components/reviewCard';

export default function Bourbons() {
  const [reviews, setReviews] = useState([]);

  const getAllWhiskey = () => {
    getWhiskeyReviews().then(setReviews);
  };

  useEffect(() => {
    getAllWhiskey();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {reviews.map((review) => (
        <ReviewCard key={review.firebaseKey} reviewObj={review} onUpdate={getAllWhiskey} />
      ))}
    </div>
  );
}

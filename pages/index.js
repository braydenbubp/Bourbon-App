import { useEffect, useState } from 'react';
import { getReviews } from '../api/reviewData';
import ReviewCard from '../components/reviewCard';

function Home() {
  const [reviews, setReviews] = useState([]);

  const getAllReviews = () => {
    getReviews().then(setReviews);
  };

  useEffect(() => {
    getAllReviews();
  }, []);

  return (
    <div>
      <div className="d-flex flex-wrap">
        {reviews.map((review) => (
          <ReviewCard key={review.firebaseKey} reviewObj={review} onUpdate={getAllReviews} />
        ))}
      </div>
    </div>
  );
}

export default Home;

import { useEffect, useState } from 'react';
import { getReviews } from '../api/reviewData';
import ReviewCard from '../components/reviewCard';
import SearchBar from '../components/searchBar';

function Home() {
  const [reviews, setReviews] = useState([]);
  const [reviewSearch, setReviewSearch] = useState([]);

  const getAllReviews = () => {
    getReviews().then(setReviews);
  };

  useEffect(() => {
    setReviewSearch(reviews);
  }, [reviews]);

  useEffect(() => {
    getAllReviews();
  }, []);

  return (
    <div>
      <SearchBar setReviewSearch={setReviewSearch} reviewSearch={reviewSearch} reviews={reviews} />
      <div className="d-flex flex-wrap">
        {reviewSearch.map((review) => (
          <ReviewCard key={review.firebaseKey} reviewObj={review} onUpdate={getAllReviews} />
        ))}
      </div>
    </div>
  );
}

export default Home;

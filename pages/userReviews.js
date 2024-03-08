import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import ReviewCard from '../components/reviewCard';
import UserBio from '../components/userBio';
import { getReviewsByUid } from '../api/reviewData';

function UserReviews() {
  const [reviews, setReviews] = useState([]);

  const { user } = useAuth();

  const getAllReviews = () => {
    getReviewsByUid(user.uid).then(setReviews);
  };

  useEffect(() => {
    getAllReviews();
  });

  return (
    <div className="text-center my-4">
      <UserBio />
      <div id="user-review-cards" className="d-flex flex-wrap">
        {reviews.map((review) => (
          <ReviewCard key={review.id} reviewObj={review} onUpdate={getAllReviews} />
        ))}
      </div>

    </div>
  );
}

export default UserReviews;

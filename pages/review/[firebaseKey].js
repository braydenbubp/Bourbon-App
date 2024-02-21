import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import { getSingleReview } from '../../api/reviewData';

export default function ViewReview() {
  const [reviewDetails, setReviewDetails] = useState({});
  const router = useRouter();

  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleReview(firebaseKey).then(setReviewDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <Card.Img src={reviewDetails.image} alt={reviewDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <Card.Title>{reviewDetails.spiritName}</Card.Title>
        Reviewed By: {reviewDetails.userName}
        <p>{reviewDetails.description || ''}</p>
        <p>{reviewDetails.price}</p>
        <p>{reviewDetails.rating}</p>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import { getSingleReview } from '../../api/reviewData';
import CommentForm from '../../components/forms/commentForm';
import CommentCard from '../../components/commentCard';

export default function ViewReview() {
  const [reviewDetails, setReviewDetails] = useState({});
  const [commentDetails, setCommentDetails] = useState({});
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
        <p>Description: {reviewDetails.description || ''}</p>
        <p>Price: ${reviewDetails.price}</p>
        <p>Rating: {reviewDetails.rating}</p>
      </div>
      <div>
        <Card style={{
          width: '20rem', margin: '10px', backgroundColor: '#cbbaa6', color: '#605d50',
        }}
        >
          <CommentForm commentObj={commentDetails} setCommentObj={setCommentDetails} />
          <div className="d-flex flex-wrap"> Comments:
            {commentDetails.comment?.map((comments) => (
              <CommentCard key={comments.reviewId} comment={comments} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

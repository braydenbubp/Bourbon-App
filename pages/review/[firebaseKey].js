import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import CommentForm from '../../components/forms/commentForm';
import CommentCard from '../../components/commentCard';
import { viewReviewDetails } from '../../api/mergedData';
import { getReviewComments } from '../../api/commentData';

export default function ViewReview() {
  const [reviewDetails, setReviewDetails] = useState({});
  const [commentArray, setCommentArray] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  const commentUpdate = () => {
    getReviewComments(firebaseKey).then(setCommentArray);
  };

  useEffect(() => {
    viewReviewDetails(firebaseKey).then(setReviewDetails);
  }, [firebaseKey]);

  useEffect(() => {
    commentUpdate();
  });

  return (
    <div>
      <div className="d-flex flex-wrap" id="reviewImg">
        <div id="viewImg">
          <Card.Img src={reviewDetails.image} alt={reviewDetails.title} style={{ width: '300px' }} />
        </div>
        <div className="text-white ms-5 details">
          <Card.Title>{reviewDetails.spiritName}</Card.Title>
          <p>Reviewed By: {reviewDetails.userObject?.userName}</p>
          <p>Description: {reviewDetails.description || ''}</p>
          <p>Price: ${reviewDetails.price}</p>
          <p>Rating: {reviewDetails.rating}</p>
        </div>
      </div>
      <div className="mt-5" id="wholeCommentDiv">
        <CommentForm commentArray={commentArray} setCommentArray={setCommentArray} reviewDetails={reviewDetails} onUpdate={commentUpdate} />
      </div>
      <Card id="commentHolder">
        <div className="d-flex flex-wrap" id="commentSection">
          {commentArray.map((comments) => (
            <CommentCard key={comments.firebaseKey} comment={comments} />
          ))}
        </div>
      </Card>
    </div>
  );
}

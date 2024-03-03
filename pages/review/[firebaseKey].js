import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getSingleReview } from '../../api/reviewData';
import CommentForm from '../../components/forms/commentForm';
import CommentCard from '../../components/commentCard';

export default function ViewReview({ userObj }) {
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
        Reviewed By: {userObj.userName}
        <p>Description: {reviewDetails.description || ''}</p>
        <p>Price: ${reviewDetails.price}</p>
        <p>Rating: {reviewDetails.rating}</p>
      </div>
      <div>
        <Card style={{
          width: '20rem', margin: '10px', backgroundColor: '#cbbaa6', color: '#605d50',
        }}
        >
          <div>
            <CommentForm commentObj={commentDetails} setCommentObj={setCommentDetails} reviewDetails={reviewDetails} />
          </div>
          <div className="d-flex flex-wrap"> Comments:
            {commentDetails.comment?.map((comments) => (
              <CommentCard key={comments.firebaseKey} comment={comments} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
// userObj needs passed in for reviewdetails.userNAme so the user renders
ViewReview.propTypes = {
  userObj: PropTypes.shape({
    uid: PropTypes.string,
    bio: PropTypes.string,
    firebaseKey: PropTypes.string,
    userName: PropTypes.string,
  }).isRequired,
};

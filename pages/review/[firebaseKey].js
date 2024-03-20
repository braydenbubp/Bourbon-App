import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Card } from 'react-bootstrap';
import CommentForm from '../../components/forms/commentForm';
import CommentCard from '../../components/commentCard';
import { viewReviewDetails } from '../../api/mergedData';
import { getReviewComments } from '../../api/commentData';
import { getRTPByReviewId } from '../../api/reviewTasteProfile';

export default function ViewReview() {
  const [reviewDetails, setReviewDetails] = useState({});
  const [commentArray, setCommentArray] = useState([]);
  const [reviewTasteProfile, setReviewTasteProfile] = useState([]);
  const router = useRouter();

  const { firebaseKey } = router.query;

  const commentUpdate = () => {
    getReviewComments(firebaseKey).then(setCommentArray);
  };

  useEffect(() => {
    viewReviewDetails(firebaseKey).then(setReviewDetails);
    getRTPByReviewId(firebaseKey).then((rtp) => {
      setReviewTasteProfile(rtp[0]);
    });
  }, [firebaseKey]);

  useEffect(() => {
    commentUpdate();
  });

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <Card.Img src={reviewDetails.image} alt={reviewDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <Card.Title>{reviewDetails.spiritName}</Card.Title>
        <p>Reviewed By: {reviewDetails.userObject?.userName}</p>
        <p>Description: {reviewDetails.description || ''}</p>
        <p>Price: ${reviewDetails.price}</p>
        <p>Rating: {reviewDetails.rating}</p>
        <p>Note Profile: {reviewTasteProfile.tasteProfileId?.map((notes, index) => (
          <span key={notes.firebaseKey}>{`${notes.note}${index !== notes.length - 1 ? ', ' : ''}`}</span>
        ))}
        </p>
      </div>
      <div>
        <Card style={{
          width: '20rem', margin: '10px', backgroundColor: '#cbbaa6', color: '#605d50',
        }}
        >
          <div>
            <CommentForm commentArray={commentArray} setCommentArray={setCommentArray} reviewDetails={reviewDetails} onUpdate={commentUpdate} />
          </div>
          <div className="d-flex flex-wrap"> Comments:
            {commentArray.map((comments) => (
              <CommentCard key={comments.firebaseKey} comment={comments} />
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

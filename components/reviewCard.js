import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteReview } from '../api/reviewData';
import { useAuth } from '../utils/context/authContext';

function ReviewCard({ reviewObj, onUpdate }) {
  const { user } = useAuth();
  const deleteThisReview = () => {
    if (window.confirm(`Delete ${reviewObj.spiritName}?`)) {
      deleteReview(reviewObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={reviewObj.image} alt={reviewObj.spiritName} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{reviewObj.spiritName}</Card.Title>
        <p>${reviewObj.price}</p>
        <p>Rating: {reviewObj.rating}</p>
        <p>{reviewObj.description}</p>

        { user.uid === reviewObj.uid ? (
          <>
            <Link href={`/review/edit/${reviewObj.firebaseKey}`} passHref>
              <Button variant="info">EDIT</Button>
            </Link>
            <Link href={`/review/${reviewObj.firebaseKey}`} passHref>
              <Button variant="light" className="m-2">VIEW</Button>
            </Link>
            <Button variant="danger" onClick={deleteThisReview} className="m-2">
              DELETE
            </Button>
          </>
        ) : (
          <Link href={`/review/${reviewObj.firebaseKey}`} passHref>
            <Button variant="light" className="m-2">VIEW</Button>
          </Link>
        )}
      </Card.Body>
    </Card>
  );
}

ReviewCard.propTypes = {
  reviewObj: PropTypes.shape({
    image: PropTypes.string,
    spiritName: PropTypes.string,
    price: PropTypes.string,
    description: PropTypes.string,
    rating: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    reviewId: PropTypes.string,
  }).isRequired,
  // eslint-disable-next-line react/require-default-props
  user: PropTypes.shape({
    uid: PropTypes.string,
    bio: PropTypes.string,
    userName: PropTypes.string,
  }),
  onUpdate: PropTypes.func.isRequired,
};

export default ReviewCard;

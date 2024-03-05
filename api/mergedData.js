import { getSingleUser } from '../utils/auth';
import { getComments } from './commentData';
import { getSingleReview } from './reviewData';

const viewReviewDetails = (reviewFirebaseKey) => new Promise((resolve, reject) => {
  getSingleReview(reviewFirebaseKey)
    .then((reviewObject) => {
      getSingleUser(reviewObject.userId)
        .then((userObject) => {
          resolve({ userObject, ...reviewObject });
        });
    }).catch((error) => reject(error));
});

const commentsOnReview = (reviewComments) => new Promise((resolve, reject) => {
  getComments(reviewComments)
    .then((commentArray) => {
      getSingleReview(commentArray.reviewId)
        .then((reviewObject) => {
          resolve({ reviewObject, ...commentArray });
        });
    }).catch((error) => reject(error));
});

export {
  viewReviewDetails,
  commentsOnReview,
};

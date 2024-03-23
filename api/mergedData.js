import { getSingleUser } from '../utils/auth';
import { deleteComment, getReviewComments } from './commentData';
import { deleteReview, getSingleReview } from './reviewData';

const viewReviewDetails = (reviewFirebaseKey) => new Promise((resolve, reject) => {
  getSingleReview(reviewFirebaseKey)
    .then((reviewObject) => {
      getSingleUser(reviewObject.userId)
        .then((userObject) => {
          resolve({ userObject, ...reviewObject });
        });
    }).catch((error) => reject(error));
});

const commentsOnReview = (reviewFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleReview(reviewFirebaseKey), getReviewComments(reviewFirebaseKey)])
    .then(([reviewObject, reviewCommentArray]) => {
      resolve({ ...reviewObject, comment: reviewCommentArray });
    }).catch((error) => reject(error));
});

const deleteReviewComments = (reviewId) => new Promise((resolve, reject) => {
  getReviewComments(reviewId).then((commentArray) => {
    const deleteCommentPromises = commentArray.map((comment) => deleteComment(comment.firebaseKey));

    Promise.all(deleteCommentPromises).then(() => {
      deleteReview(reviewId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export {
  viewReviewDetails,
  commentsOnReview,
  deleteReviewComments,
};

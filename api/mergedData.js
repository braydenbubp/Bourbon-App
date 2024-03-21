import { getSingleUser } from '../utils/auth';
import { deleteComment, getReviewComments } from './commentData';
import { deleteReview, getSingleReview } from './reviewData';
import { getRTPByReviewId } from './reviewTasteProfile';

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

const getReviewAndRTP = (reviewFirebaseKey) => new Promise((resolve, reject) => {
  Promise.all([getSingleReview(reviewFirebaseKey), getRTPByReviewId(reviewFirebaseKey)])
    .then(([reviewObject, rtpArray]) => {
      resolve({ ...reviewObject, reviewTasteProfile: rtpArray });
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

// see view author details to join the tables, and then get data from there (how it looks)

export {
  viewReviewDetails,
  commentsOnReview,
  deleteReviewComments,
  getReviewAndRTP,
};

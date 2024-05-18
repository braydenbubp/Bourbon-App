import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getComments = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comment.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getReviewComments = (reviewId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comment.json?orderBy="reviewId"&equalTo="${reviewId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const createComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comment.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comment/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteComment = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comment/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

export {
  createComment,
  updateComment,
  deleteComment,
  getComments,
  getReviewComments,
};

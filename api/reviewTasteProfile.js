import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getReviewTasteProfile = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviewTasteProfile.json`, {
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

const createReviewTasteProfile = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviewTasteProfile.json`, {
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

const updateReviewTasteProfile = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviewTasteProfile/${payload.firebaseKey}.json`, {
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

const getSingleReviewTasteProfile = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviewTasteProfile/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getRTPByReviewId = (reviewId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviewTasteProfile.json?orderBy="reviewId"&equalTo="${reviewId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getReviewTasteProfile,
  createReviewTasteProfile,
  updateReviewTasteProfile,
  getSingleReviewTasteProfile,
  getRTPByReviewId,
};

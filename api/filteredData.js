import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getBourbonReviews = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews.json?orderBy="spiritTypeId"&equalTo="Bourbon"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getScotchReviews = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews.json?orderBy="spiritTypeId"&equalTo="Scotch"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getWhiskeyReviews = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews.json?orderBy="spiritTypeId"&equalTo="Whiskey"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getBourbonReviews,
  getScotchReviews,
  getWhiskeyReviews,
};

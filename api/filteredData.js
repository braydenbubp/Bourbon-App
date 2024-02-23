import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getBourbonReviews = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews.json?orderBy="spiritType"&equalTo="Bourbon"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getScotchReviews = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews.json?orderBy="spiritType"&equalTo="Scotch"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getWhiskeyReviews = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reviews.json?orderBy="spiritType"&equalTo="Whiskey"`, {
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
  getBourbonReviews,
  getScotchReviews,
  getWhiskeyReviews,
};

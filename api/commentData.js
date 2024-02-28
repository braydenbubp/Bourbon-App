import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createComment = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comment.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(Object.values(data)))
    .then((data) => resolve(data))
    .catch(reject);
});

export default createComment;

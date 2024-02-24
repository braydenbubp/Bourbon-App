import firebase from 'firebase/app';
import 'firebase/auth';
// import { clientCredentials } from './client';

// const checkUser = (uid) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/checkuser`)
// })

const signIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const signOut = () => {
  firebase.auth().signOut();
};

export { signIn, signOut };

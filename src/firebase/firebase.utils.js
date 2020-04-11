import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDlHvm4hAbvhhBkhbnmEoa5slkY_mZPSuc",
    authDomain: "crwn-db-d541d.firebaseapp.com",
    databaseURL: "https://crwn-db-d541d.firebaseio.com",
    projectId: "crwn-db-d541d",
    storageBucket: "crwn-db-d541d.appspot.com",
    messagingSenderId: "191217904731",
    appId: "1:191217904731:web:7426550086beb0739be37e",
    measurementId: "G-NZ44NFMG7G"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
      const userRef = firestore.doc(`users/${userAuth.uid}`);

      const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase; 

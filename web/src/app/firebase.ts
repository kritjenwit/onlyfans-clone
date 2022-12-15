import { FirebaseError, initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { firebaseConfig } from "../config/firebase";

export const firebaseApp = initializeApp(firebaseConfig);

export const resultLoginGoogle = async () => {
  const provider = new GoogleAuthProvider();
  /* Adding a scope to the GoogleAuthProvider. */
//   provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const auth = getAuth();
  try {
    const result = await signInWithPopup(auth, provider);
    return result;
  } catch (error) {
    // // Handle Errors here.
    const errorType = error as FirebaseError
    const errorCode = errorType.code;
    const errorMessage = errorType.message;
    // // The email of the user's account used.
    // // const email = errorType.customData.email;
    // // The AuthCredential type that was used.
    // const credential = GoogleAuthProvider.credentialFromError(errorType);
    // return credential;
    return {
      user: null,
      error: errorMessage,
      code: errorCode
      
    }
  }
};

import firebaseConfig from "./firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
// import { getFirestore } from '@firebase/firestore'

export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
// const db = getFirestore(app);

const provider = new GoogleAuthProvider();


export const signWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential.accessToken;
      // The signed-in user info.
      // const user = result.user;
      // const name = user.displayName
      // const email = user.email
            
      // console.log('Autenticado con exito')
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    }).catch((error) => {
      // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

export const logout = async () => {
  try {
    await signOut(auth)
    // console.log('Cerraste sesion')
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
}

export const registerEvent = (event) => {
  logEvent(analytics, event);
}

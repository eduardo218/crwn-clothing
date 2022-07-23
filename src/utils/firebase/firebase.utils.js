import { initializeApp } from "firebase/app";

import {
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

import {getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAEZfc6za2pTDwx6HVJwKLUF3ew-I33OYQ",
    authDomain: "crwn-clothing-db-6ab23.firebaseapp.com",
    projectId: "crwn-clothing-db-6ab23",
    storageBucket: "crwn-clothing-db-6ab23.appspot.com",
    messagingSenderId: "882041472723",
    appId: "1:882041472723:web:e9ca521ee47db4df6bf626"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const googlePrivider = new GoogleAuthProvider();
  googlePrivider.setCustomParameters({
    prompt: "select_account"
  })

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googlePrivider)
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googlePrivider)

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return

    const userDocRef = doc(db, 'users', userAuth.uid)

    const userSnapshot = await getDoc(userDocRef)

    if(!userSnapshot.exists()){
      const {displayName, email} = userAuth
      const createdAt = new Date()

      try{
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        })
      }catch(error){
        console.log("error creating the user: ", error.message)
      }
    }

    return userDocRef
  }

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return

    return await createUserWithEmailAndPassword(auth, email, password)
  }
  
  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return

    return await signInWithEmailAndPassword(auth, email, password)
  }

  export const signOutUser = async () => {
    return await signOut(auth)
  }

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
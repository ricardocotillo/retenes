import firebase from "firebase"

const config = {
  apiKey: "AIzaSyDkNjd2GER7IJmF-vcBq8r-Q_Dd72tJMKw",
  authDomain: "wbretenes.firebaseapp.com",
  databaseURL: "https://wbretenes.firebaseio.com",
  projectId: "wbretenes",
  storageBucket: "wbretenes.appspot.com",
  messagingSenderId: "877198952152",
}
firebase.initializeApp(config)

const settings = {timestampsInSnapshots: true}

const firestore = firebase.firestore()

firestore.settings(settings)

export const db = firestore
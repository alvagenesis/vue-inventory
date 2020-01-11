import firebase from "firebase/app";
import "firebase/firestore";

export const db = firebase
  .initializeApp({
    projectId: "queue-app-a17d3",
    databaseURL: "https://queue-app-a17d3.firebaseio.com"
  })
  .firestore();

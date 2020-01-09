import Vue from "vue";
import { firestorePlugin } from "vuefire";
import firebase from "firebase/app";
import "firebase/firestore";

Vue.use(firestorePlugin);
firebase.initializeApp({
  projectId: "queue-app-a17d3",
  databaseURL: "https://queue-app-a17d3.firebaseio.com"
});

export const db = firebase.firestore();

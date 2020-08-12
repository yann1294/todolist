import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import firebase from "firebase";

Vue.config.productionTip = false;

const config = {
  apiKey: "AIzaSyA-x0iE1KlIVTKU0HnKrkG1SxcKUfjdUQI",
  authDomain: "todolist-5da86.firebaseapp.com",
  databaseURL: "https://todolist-5da86.firebaseio.com",
  projectId: "todolist-5da86",
  storageBucket: "todolist-5da86.appspot.com",
  messagingSenderId: "400141514103",
  appId: "1:400141514103:web:769ab5c1c90dc04b6fdd72",
};

firebase.initializeApp(config);

export const db = firebase.firestore();

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");

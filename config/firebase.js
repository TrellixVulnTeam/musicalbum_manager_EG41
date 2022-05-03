// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
//const { getAnalytics } = require("firebase/analytics");
const { getDatabase, ref, child, set } = require("firebase/database");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw7SymHPTZYCXRukcy-pQDO9avT-WRv44",
  authDomain: "musicalbum-app.firebaseapp.com",
  databaseURL: "https://musicalbum-app-default-rtdb.firebaseio.com",
  projectId: "musicalbum-app",
  storageBucket: "musicalbum-app.appspot.com",
  messagingSenderId: "218205941487",
  appId: "1:218205941487:web:a923b40aa5f2ea0242f51a",
  measurementId: "G-68TVC9YY18",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const database = getDatabase(app);

module.exports = database;

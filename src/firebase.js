// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpITnmBPiTs-xryfRrKH9IN__7QK2iWec",
  authDomain: "documentapp-878bd.firebaseapp.com",
  projectId: "documentapp-878bd",
  storageBucket: "documentapp-878bd.appspot.com",
  messagingSenderId: "664226631611",
  appId: "1:664226631611:web:79e48320be710c5b65fe9e",
  measurementId: "G-MH8ENX5D4D"
};

// const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
const app = initializeApp(firebaseConfig);
export const datas = getFirestore(app)
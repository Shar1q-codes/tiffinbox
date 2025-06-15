import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBHCEB8IVfsM7t98vrsY1VldtZQ7oWlE5o",
  authDomain: "tiffinbox-564cc.firebaseapp.com",
  projectId: "tiffinbox-564cc",
  storageBucket: "tiffinbox-564cc.firebasestorage.app",
  messagingSenderId: "239789185849",
  appId: "1:239789185849:web:fb81e11cfa102e7ab5e6e8",
  measurementId: "G-X32ZZJCEH2"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics }; 
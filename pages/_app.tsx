import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { createContext } from "react";
import { Auth, getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyD4dx7F8hqRvHmsV8oITXYKBVlK91x3hzs",
  authDomain: "internet-shop-e9410.firebaseapp.com",
  projectId: "internet-shop-e9410",
  storageBucket: "internet-shop-e9410.appspot.com",
  messagingSenderId: "56422421072",
  appId: "1:56422421072:web:12618af8e3743cf89eb755",
  measurementId: "G-9RFCTCNBH5",
});

const auth = getAuth();
const database = getFirestore(app);

export const Context = createContext<null | object>(null);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Context.Provider value={{ database, auth }}>
      {" "}
      <Component {...pageProps} />
    </Context.Provider>
  );
}

import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import axios from "axios";
import app from "../Firebase/Firebase.config";

export const AuthContext = createContext(null);
// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children }) => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState(null)
  const [priceSlider, setPriceSlider] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(null)
console.log(minRating);
console.log(user);
  const loginWithEmail = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const signUpWithEmail = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => console.log(error.message));
  };
  const info = {
    user,
    loading,
    loginWithEmail,
    signUpWithEmail,
    googleSignIn,
    logOut,
    categoryFilter,
    setCategoryFilter,
    priceSlider,
    setPriceSlider,
    minRating,
    setMinRating
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
      console.log(loggedUser);
        if(loggedUser){
          axios.post("https://mbb-e-commerce-server.vercel.app/jwt",{email: loggedUser?.email})
          .then(data => {
            const token = data.data.token;
            console.log(token);
            localStorage.setItem("access-token", token)
          })
        }
          else{
            localStorage.removeItem("access-token")
          }
      setLoading(false);
    });
    return () => {
      return unsubscribe;
    };
  }, [auth]);
 
  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

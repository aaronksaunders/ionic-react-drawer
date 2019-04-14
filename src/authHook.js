import React from "react";
import firebaseService from "./firebase";

export const useAuth = () => {
    const [state, setAuthState] = React.useState(() => {
      const user = firebaseService.auth.currentUser;
      return { initializing: true, user };
    });
  
    function onChange(user) {
      console.log(state.initializing, user)
      setAuthState({ initializing: false, user });
    }
  
    React.useEffect(() => {
      // listen for auth state changes
      const unsubscribe = firebaseService.auth.onAuthStateChanged(onChange);
      // unsubscribe to the listener when unmounting
      return () => unsubscribe();
    }, [state.initializing]);
  
    return state;
  };
  
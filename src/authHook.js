import React from "react";
import firebaseService from "./firebase";

export const useAuth = () => {
    const [state, setAuthState] = React.useState(() => {
      debugger;
      const user = firebaseService.auth.currentUser;
      return { initializing: true, user };
    });
  
    function onChange(user) {
      debugger;
      console.log(state.initializing)
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
  
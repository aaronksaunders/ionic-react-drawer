import React, { useState } from "react";
import firebaseService from "../firebase";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setAuthenticated] = useState(false);
  const login = async (email, password) => {
    try {
      let user = await firebaseService.login(email, password);
      //props.history.replace("/dashboard");
      setAuthenticated(true)
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setAuthenticated,
        login
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const AuthConsumer = AuthContext.Consumer;


export { AuthProvider, AuthConsumer };

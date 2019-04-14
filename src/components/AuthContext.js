import React, { useState } from "react";
import firebaseService from "../firebase";
import { useAuth } from "../authHook";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  // const [isAuth, setAuthenticated] = useState(false);
  const { initializing, user } = useAuth();
  /**
   *
   */
  const logout = () => {
    try {
      return firebaseService.logout().then(() => {
        //setAuthenticated(false);
      });
    } catch (error) {
      alert(error.message);
    }
  };
  /**
   *
   * @param {*} email
   * @param {*} password
   */
  const login = (email, password) => {
    try {
      return firebaseService.login(email, password).then(() => {
        //setAuthenticated(true);
      });
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        isAuth : (user !== null),
        login,
        logout,
        initializing : initializing,
        user : user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const AuthConsumer = AuthContext.Consumer;

export { AuthProvider, AuthConsumer, AuthContext };

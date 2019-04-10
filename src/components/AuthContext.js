import React, { useState } from "react";
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [isAuth, setAuthenticated] = useState(false);
  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
const AuthConsumer = AuthContext.Consumer;
export { AuthProvider, AuthConsumer };

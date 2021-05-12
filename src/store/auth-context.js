import React, { useState, useEffect } from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false, // default value
  onLogin: () => {},
  onLogout: () => {},
});

export default AuthContext;

export const AuthContextProvider = props => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('isUserLoggedIn')) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
    localStorage.setItem('isUserLoggedIn', 'true');
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isUserLoggedIn');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

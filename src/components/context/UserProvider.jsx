import { createContext, useState, useEffect } from "react";

export const userContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  const registerUser = (email, password) => {
    // register user

  }

  const loginUsuario = (email, password) => {
    // login user
    const user = {
      email,
      password
    }
    setUser(user);


  }
   


  return (
    <userContext.Provider
      value={{ user, setUser, registerUser, loginUsuario}}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;

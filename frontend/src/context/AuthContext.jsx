import { createContext, useContext, useState } from "react";

//store / global variable
export const AuthContext = createContext();

//hook to use context anywhere 
export const useAuthContext = () => {
  return useContext(AuthContext)
}

//provider
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("mern-chat-app-user"))
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};


// User signs up
//     ↓
// Send data to server (fetch /api/auth/signup)
//     ↓
// Server responds with user data
//     ↓
// Set localStorage: "mern-chat-app-user" = user data
//     ↓
// Set Context: authUser = user data
//     ↓
// App knows: User is logged in 🎉
//     ↓
// Any page can use `useAuthContext()` to get current user
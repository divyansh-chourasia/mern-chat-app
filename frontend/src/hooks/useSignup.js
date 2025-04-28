import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();

  const signup = async ({fullName,username,password,confirmPassword,gender}) => {
    
    const success = handleInputErrors({fullName,username,password,confirmPassword,gender,});
    if (!success) return;

    setLoading(true);

    // fetch expects the body of a POST request to be a string, not an object — that's why we use JSON.stringify().
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await res.json(); 
      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Signup successful!");

      //local storage
      localStorage.setItem("mern-chat-app-user", JSON.stringify(data));
      // context
      setAuthUser(data);
    } 
    catch (error) {
      toast.error(error.message);
    } 
    finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all the fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Password do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}


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
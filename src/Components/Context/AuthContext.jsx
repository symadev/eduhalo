import { createContext, useState, useEffect } from "react";

import UseAxiosPublic from "./UseAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = UseAxiosPublic();

  const createUser = async (name, email, password, role = "parent") => {
  const res = await axiosPublic.post("/signup", { name, email, password, role });
  const { token, user } = res.data;

  localStorage.setItem("token", token);
  setUser(user);

  return res.data;
};


// here i can set the token in login and  the signup   also 
// here need to set the token in the signup for set the login automatically after the registration

const signIn = async (email, password) => {
  const res = await axiosPublic.post("/login", { email, password });
  const { token, user } = res.data;
  localStorage.setItem("token", token);
  setUser(user); // This sets role, name, etc. for Navbar
  return user;
};


  const logOut = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  const getMe = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const res = await axiosPublic.get("/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      localStorage.removeItem("token");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };



//   When a user logs in, you store their token in localStorage.
// Now if they refresh the page, your app loses state (the user variable is reset).
// getMe() checks if a token exists and re-authenticates the user.



  useEffect(() => {
    getMe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    logOut,
    setUser,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

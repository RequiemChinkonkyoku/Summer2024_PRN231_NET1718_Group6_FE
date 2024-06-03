import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../axiosConfig"; // Adjust the path accordingly

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
      console.log("Token set in local storage and axios headers:", token); // Debug log
      // You can also fetch user data here if needed
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      console.log("Token removed from local storage and axios headers"); // Debug log
      setUser(null);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post("/Account/customer-login", {
        email,
        password,
      });
      console.log("Login response:", response.data); // Debug log
      setToken(response.data.token);
    } catch (error) {
      console.error("Login failed", error);
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;

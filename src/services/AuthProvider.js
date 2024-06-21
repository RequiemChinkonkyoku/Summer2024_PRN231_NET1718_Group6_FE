import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "../axiosConfig";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
      try {
        const decodedToken = jwtDecode(token);
        setUser(decodedToken); // Assuming decoded token contains user info including role
      } catch (error) {
        console.error("Invalid token", error);
        setToken(null);
        setUser(null);
      }
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const loginCust = async (email, password) => {
    try {
      const response = await axios.post("/Account/customer-login", {
        email,
        password,
      });
      setToken(response.data.token);
    } catch (error) {
      console.error("Login failed", error);
      throw new Error("Login failed");
    }
  };

  const loginDent = async (email, password) => {
    try {
      const response = await axios.post("/Account/dentist-login", {
        email,
        password,
      });
      setToken(response.data.token);
    } catch (error) {
      console.error("Login failed", error);
      throw new Error("Login failed");
    }
  };

  const loginEmpl = async (email, password) => {
    try {
      const response = await axios.post("/Account/employee-login", {
        email,
        password,
      });
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
    <AuthContext.Provider
      value={{ token, user, loginCust, loginDent, loginEmpl, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;

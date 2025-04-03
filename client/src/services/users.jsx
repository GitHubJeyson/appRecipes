import AuthContext from '../context/authContext.js'
import { useEffect } from "react";
import { useState } from "react";
import { loginRequest, registerRequest, verifyTokenRequest, getUsersRequest, deleteUserRequest } from "./apiAuth.js";
import Cookies from "js-cookie";


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
  
  
    useEffect(() => {
      if (errors.length > 0) {
        const timer = setTimeout(() => {
          setErrors([]);
        }, 5000);
        return () => clearTimeout(timer);
      }
    }, [errors]);
  
    const signup = async (user) => {
      try {
        const res = await registerRequest(user);
        if (res.status === 200) {
          setUser(res.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        setErrors(error.response.data.message);
      }
    };
  
    const signin = async (user) => {
      try {
        const res = await loginRequest(user);
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (error) {
        setErrors(error.response.data.message)
      }
    };
  
    const logout = async () => {
      try {
      Cookies.remove("token");
      setUser(null);
      setIsAuthenticated(false);
      } catch (error) {
        setErrors(error.response.data.message)
      }
    };
  
    useEffect(() => {
      const checkLogin = async () => {
        const cookies = Cookies.get();
        if (!cookies.token) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }
  
        try {
          const res = await verifyTokenRequest(cookies.token);
          if (!res.data) return setIsAuthenticated(false);
          setIsAuthenticated(true);
          setUser(res.data);
          setLoading(false);
        } catch (error) {
          setIsAuthenticated(false);
          setLoading(false); 
        }
      };
      checkLogin();
    }, []);

    const getUsers = async () => {
      try {
        const res = await getUsersRequest();
        setUsers(res.data);
      } catch (error) {
        console.log(error)
      }
    };
    
    const deleteUser = async (userId) => {
      try {
        const res = await deleteUserRequest(userId);
        if (res.status === 200) return setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
        console.log(error);
      }
    };
    
    
    return (
      <AuthContext.Provider
        value={{
          user,
          users,
          getUsers,
          deleteUser,
          signup,
          signin,
          logout,
          isAuthenticated,
          errors,
          loading,
        }}>
        {children}
      </AuthContext.Provider>
    );
  };
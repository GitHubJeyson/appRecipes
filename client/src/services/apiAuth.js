import axios from "./axios";

export const registerRequest = async (user) => axios.post(`/auth/register`, user);

export const loginRequest = async (user) => axios.post(`/auth/login`, user);

export const verifyTokenRequest = async () => axios.get(`/auth/verify`);

export const checkAdminExists = async () => {
    try {
      const response = await axios.get(`/auth/check-admin`);
      return response.data.exists;
    } catch (error) {
      console.error("Error al comprobar si existe el administrador:", error);
      return false;
    }
  };

export const getUsersRequest = async () => { return axios.get(`/auth/users`) };

export const deleteUserRequest = async (userId) => { return axios.delete(`/auth/users/${userId}`) };
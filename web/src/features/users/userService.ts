import axios from "axios";
import { API_URL } from "../../constants/api";

const __setLocalStorage = (key: string, value: object) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loginEmail = async (loginData: any) => {
  let data;
  const response = await axios.post(API_URL.AUTHEN.EMAIL.LOGIN, loginData);
  if ((data = response.data)) {
    __setLocalStorage("user", data.data);
  }
  return data;
};

export const loginGoogle = async (loginData: any) => {
  let data;
  const response = await axios.post(API_URL.AUTHEN.GOOGLE.LOGIN, loginData);
  if ((data = response.data)) {
    __setLocalStorage("user", data.data);
  }
  return data;
};

export const registerEmail = async (registerData: any) => {
  try {
    let data;
    const response = await axios.post(
      API_URL.AUTHEN.EMAIL.REGISTER,
      registerData
    );
    if ((data = response.data)) {
      __setLocalStorage("user", data.data);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  registerEmail,
  logout,
  loginEmail,
  loginGoogle,
};

export default authService;

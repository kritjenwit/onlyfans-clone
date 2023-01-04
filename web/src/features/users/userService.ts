import axios from "axios";
import { API_URL } from "../../constants/api";

const __setLocalStorage = (key: string, value: object) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const loginEmail = async (loginData: any) => {
  const response = await axios.post(API_URL.AUTHEN.EMAIL.LOGIN, loginData);
  let data = response.data;
  if (data.code == 1101) {
    __setLocalStorage("user", data.data);
  }
  return data;
};

export const loginGoogle = async (loginData: any) => {
  const response = await axios.post(API_URL.AUTHEN.GOOGLE.LOGIN, loginData);
  let data = response.data;
  if (data.code == 1101) {
    __setLocalStorage("user", data.data);
  }
  return data;
};

export const registerEmail = async (registerData: any) => {
  try {
    const response = await axios.post(
      API_URL.AUTHEN.EMAIL.REGISTER,
      registerData
    );
    let data = response.data;
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

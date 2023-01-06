import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import authService from "./userService";
import axios, { Axios, AxiosError } from "axios";

// Define a type for the slice state
export interface UserState {
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  value: number;
  isLogin: boolean;
  user: {
    idx: number;
    email: string;
    img_url: string;
    nickname: string;
    point: number;
    subscription_price: number;
  } | null;
}

let user;
// Get user from localStorage
try {
  const userInLocalStorage = localStorage.getItem("user");
  user = userInLocalStorage ? JSON.parse(userInLocalStorage) : null;
} catch {
  user = null;
}

// Define the initial state using that type
const initialState: UserState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  value: 0,
  isLogin: user ? true : false,
  user: user,
};

interface IncommingFormLogin {
  email: string;
  password: string;
}

const __rejectWithValue = async (thunkAPI: any, error: AxiosError<any, {}>) => {
  let errorType = error as AxiosError<any, {}>;

  let code: number | undefined;
  let message: string;

  if (errorType.code === "ERR_NETWORK") {
    code = 500;
    message = "Network error";
  } else {
    code = errorType.response?.status;
    message = errorType.response?.data?.message;
  }

  return thunkAPI.rejectWithValue({
    code,
    message,
  });
};

// Login user
export const loginEmail = createAsyncThunk<any, IncommingFormLogin>(
  "authen/email/login",
  async (user, thunkAPI) => {
    try {
      return await authService.loginEmail(user);
    } catch (error) {
      return __rejectWithValue(thunkAPI, error as AxiosError);
    }
  }
);

export const loginGoogle = createAsyncThunk<any, IncommingFormLogin>(
  "authen/google/login",
  async (user, thunkAPI) => {
    try {
      return await authService.loginGoogle(user);
    } catch (error) {
      return __rejectWithValue(thunkAPI, error as AxiosError);
    }
  }
);

export const registerEmail = createAsyncThunk<any, IncommingFormLogin>(
  "authen/email/register",
  async (user, thunkAPI) => {
    try {
      return await authService.registerEmail(user);
    } catch (error) {
      return __rejectWithValue(thunkAPI, error as AxiosError);
    }
  }
);

export const counterSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.user = null;
      state.isLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginEmail.fulfilled, (state, action) => {
        if (action.payload.code == 1101) {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload.data;
          state.isLogin = true;
        } else {
          state.isLoading = false;
          state.isSuccess = false;
          state.isLogin = false;
        }
      })
      .addCase(loginEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      })
      .addCase(loginGoogle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginGoogle.fulfilled, (state, action) => {
        if (action.payload.code == 1101) {
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload;
          state.isLogin = true;
        } else {
          state.isLoading = false;
          state.isSuccess = false;
          state.isLogin = false;
        }
      })
      .addCase(loginGoogle.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as string;
        state.user = null;
      });
  },
});

export const { reset, logout } = counterSlice.actions;
export default counterSlice.reducer;

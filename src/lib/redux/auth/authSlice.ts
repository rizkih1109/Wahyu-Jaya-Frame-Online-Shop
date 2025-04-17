import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setToken } from "../../api";
import { login } from "./authApi";

interface AuthState {
  value: User;
  status: string
}

const initialState: AuthState = {
  value: {
    id: 0,
    email: "",
    password: "",
    userName: "",
    phone: "",
    address: "",
    refreshToken: "",
    accessToken: "",
    role: "",
  },
  status: "idle"
} satisfies AuthState as AuthState;

export const loginAsync = createAsyncThunk(
  "user/login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await login(email, password);
      setToken(response.data.accessToken);
      console.log(response.data)
      return response.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuth: () => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "idle";
          state.value = action.payload;
        } else {
          state.status = "error";
          state.value = initialState.value;
        }
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = "failed";
        state.value = initialState.value;
      });
  },
});

export const {resetAuth} = authSlice.actions

export default authSlice.reducer;

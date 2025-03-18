import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login } from "./userApi";
import { setToken } from "../../api";

interface UserState {
  value: User;
  status: string
}

const initialState: UserState = {
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
} satisfies UserState as UserState;

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

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "idle";
          state.value = action.payload;
          console.log(state.value)
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


export default userSlice.reducer;

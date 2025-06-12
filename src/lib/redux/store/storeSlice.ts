import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { load } from "./storeApi";

interface storeState {
  value: Store[];
}

const initialState = {
  value: [],
  status: "idle",
};

export const loadStoreAsync = createAsyncThunk("store/load", async () => {
  const response = await load();
  return response.data
});

export const storeSlice = createSlice({
    name: "store",
    initialState,
    reducers:{},
    extraReducers: (builder) => 
})
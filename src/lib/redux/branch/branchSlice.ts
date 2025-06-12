import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { add, edit, load, remove } from "./branchApi";
import { BranchPayload } from "./types";

interface BranchState {
  value: Branch[];
  status: string;
  sort: string;
  keyword: string;
  sortBy: string
  page: number;
  pages: number;
  limit: number;
  total: number;
}

const initialState = {
  value: [],
  status: "idle",
  sort: "asc",
  keyword: "",
  sortBy: "id",
  page: 1,
  pages: 1,
  limit: 5,
  total: 0,
} satisfies BranchState as BranchState;

export const loadBranchAsync = createAsyncThunk(
  "branhcs/load",
  async ({
    keyword = "",
    sort = "asc",
    sortBy = "id",
    page = 1,
    limit = 5
  }: {
    keyword?: string;
    sort?: string;
    sortBy?: string;
    page?: number;
    limit?: number
  }) => {
    const response = await load(keyword, sort, sortBy, page, limit);
    return response;
  }
);

export const addBranchAsync = createAsyncThunk(
  "branchs/add",
  async ({ id, payload }: { id: number; payload: BranchPayload }) => {
    const response = await add(id, payload);
    return { id, data: response.data };
  }
);

export const editBranchAsync = createAsyncThunk(
  "branchs/edit",
  async ({ id, payload }: { id: number; payload: BranchPayload }) => {
    const response = await edit(id, payload);
    return { id, data: response.data };
  }
);

export const removeBranchAsync = createAsyncThunk(
  "branchs/remove",
  async (id: number) => {
    const response = await remove(id);
    return { id, data: response.data };
  }
);

export const branchSlice = createSlice({
  name: "branch",
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadBranchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadBranchAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "idle";
          state.value = action.payload.data.data;
          state.total = action.payload.data.total;
          state.page = action.payload.data.page;
          state.limit = action.payload.data.limit;
          state.pages = action.payload.data.pages;

        } else {
          state.status = "error";
          state.value = initialState.value;
        }
      })
      .addCase(loadBranchAsync.rejected, (state) => {
        state.status = "failed";
        state.value = initialState.value;
      })
      .addCase(addBranchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addBranchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = [action.payload.data, ...state.value];
      })
      .addCase(addBranchAsync.rejected, (state) => {
        state.status = "failed";
        state.value = initialState.value;
      })
      .addCase(editBranchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editBranchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = state.value.map((item: Branch) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              ...action.payload.data,
            };
          }
          return item;
        });
      })
      .addCase(editBranchAsync.rejected, (state) => {
        state.status = "error";
        state.value = [];
      })
      .addCase(removeBranchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeBranchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value = state.value.filter(
          (item) => item.id !== action.payload.data.id
        );
      })
      .addCase(removeBranchAsync.rejected, (state) => {
        state.status = "error";
        state.value = [];
      });
  },
});

export const {setPage, setLimit} = branchSlice.actions

export default branchSlice.reducer;

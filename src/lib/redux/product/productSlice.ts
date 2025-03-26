import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCreateProduct, fetchDeleteProduct, fetchGetProduct, fetchLoadproducts, fetchUpdateProduct } from "./productApi";
import { AppThunk } from "../store";

export interface ProductState {
  value: ProductsType[];
  pagination: {
      page: number;
      limit: number;
      offset: number;
  };
  product: ProductsType;
  status: 'idle' | 'loading' | 'failed'
}

const initialState: ProductState = {
  value: [],
  pagination: {
    page: 0,
    limit: 0,
    offset: 0
  },
  product: {
    id: 0,
    name: '',
    stock: 0,
    price: 0,
    images: ''
  },
  status: "idle"
};

export const loadProductAsync = createAsyncThunk(
  'Products/loadProductAsync',
  async (params: Params) => {
      const { data } = await fetchLoadproducts(params)
      return data
  }
)

export const getProductAsync = createAsyncThunk(
  'Products/getProductAsync',
  async (id: number) => {
      const { data } = await fetchGetProduct(id)
      return data
  }
)

export const addProductAsync = createAsyncThunk(
  'Products/addProductAsync',
  async (input: FormDataEntryValue) => {
      const { data } = await fetchCreateProduct(input)
      return data
  }
)

export const updateProductAsync = createAsyncThunk(
  'Products/updateProductAsync',
  async ({ id, input }: { id: number, input: FormDataEntryValue }) => {
      const { data } = await fetchUpdateProduct(id, input)
      return data
  }
)

export const deleteProductAsync = createAsyncThunk(
  'Products/deleteProductAsync',
  async (id: number | string) => {
      await fetchDeleteProduct(id)
  }
)

export const productSlice = createSlice({
  name: 'Products',
  initialState,
  reducers: {
      remove: (state, action: PayloadAction<number>) => {
          state.value = state.value.filter(product => product.id !== action.payload)
      },
      addStock: (state, action: PayloadAction<{ id: number, qty: number }>) => {
          state.value = state.value.map(item => {
              if (item.id === action.payload.id) return { ...item, stock: item.stock + action.payload.qty }
              return item
          })
      },
      reduceStock: (state, action: PayloadAction<{ id: number, qty: number }>) => {
          state.value = state.value.map(item => {
              if (item.id === action.payload.id) return { ...item, stock: (item.stock - action.payload.qty) }
              return item
          })
      },
  },
  extraReducers: (builder) => {
      builder
          .addCase(loadProductAsync.pending, (state) => {
              state.status = 'loading';
          })
          .addCase(loadProductAsync.fulfilled, (state, action) => {
              state.status = 'idle';
              state.value = action.payload.products;
              state.pagination = {
                  page: action.payload.page,
                  limit: action.payload.limit,
                  offset: action.payload.offset,
              };
          })
          .addCase(loadProductAsync.rejected, (state,) => {
              state.status = 'failed';
          })
          .addCase(getProductAsync.pending, (state) => {
              state.status = 'loading';
          })
          .addCase(getProductAsync.fulfilled, (state, action) => {
              state.status = 'idle';
              state.product = action.payload
          })
          .addCase(getProductAsync.rejected, (state, ) => {
              state.status = 'failed';
          })
  }
})

export const { remove, addStock, reduceStock } = productSlice.actions
export const selectProducts = (state: ProductState) => state.value;
export const getProduct = (state: ProductState) => state.product;
export const productsPagination = (state: ProductState) => state.pagination;

export const removeProduct = (id: number, input: Params): AppThunk => async (dispatch) => {
  try {
      dispatch(remove(id));
      await dispatch(deleteProductAsync(id));
      await dispatch(loadProductAsync(input));
  } catch (error) {
      return error
  }
}

export default productSlice.reducer

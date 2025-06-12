import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import branchReducer from "./branch/branchSlice"
import addressReducer from "./address/addressSlice"

const rootReducer = combineReducers({
  user: userReducer,
  branch: branchReducer,
  address: addressReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false,
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

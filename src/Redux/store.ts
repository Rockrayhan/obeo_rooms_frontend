import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import employeeReducer from "@/Features/Employee/featuresSlices/employeeSlice";
import { fakeBaseApi } from "./fakeBaseApi";


export const store = configureStore({
  reducer: {
    // [baseApi.reducerPath] : baseApi.reducer,
    [fakeBaseApi.reducerPath] : fakeBaseApi.reducer,
    employee: employeeReducer,
  },
   middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(baseApi.middleware),
    getDefaultMiddleware().concat(fakeBaseApi.middleware),
}) ;



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
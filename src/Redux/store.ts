import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import employeeReducer from "@/Features/Employee/featuresSlices/employeeSlice";


export const store = configureStore({
  reducer: {
    [baseApi.reducerPath] : baseApi.reducer,
    employee: employeeReducer,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
}) ;



export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
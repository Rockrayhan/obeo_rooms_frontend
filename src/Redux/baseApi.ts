
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["employee"],
  endpoints: (builder) => ({



    // POST book
    createEmployee: builder.mutation({
      query: (data) => ({
        url: "/employee",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["employee"],
    }),

    
    
  }),
});

export const {
  useCreateEmployeeMutation
} = baseApi;

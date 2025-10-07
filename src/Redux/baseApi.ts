import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["employee" ,"EmployeePosition"],
  endpoints: (builder) => ({
    // POST employee (create)
    createEmployee: builder.mutation({
      query: (data) => ({
        url: "/employee",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["employee"],
    }),

    // GET all employees
    getAllEmployees: builder.query({
      query: () => "/employee",
      providesTags: ["employee"],
    }),

    // GET employee by ID
    getEmployeeById: builder.query({
      query: (id: string) => `/employee/${id}`,
      providesTags: ["employee"],
    }),

    // PATCH employee (update)
    updateEmployee: builder.mutation({
      query: ({ id, data }) => ({
        url: `/employee/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["employee"],
    }),

    // DELETE employee
    deleteEmployee: builder.mutation({
      query: (id: string) => ({
        url: `/employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["employee"], 
    }),



  }),
});

export const {
  useCreateEmployeeMutation,
  useGetAllEmployeesQuery,
  useGetEmployeeByIdQuery,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = baseApi;

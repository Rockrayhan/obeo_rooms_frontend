import { baseApi } from "@/Redux/baseApi";

export const employeePositionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ Get all positions
    getAllPositions: builder.query({
      query: () => "/employee-position",
      providesTags: ["EmployeePosition"],
    }),

    // ✅ Get position by ID
    getPositionById: builder.query({
      query: (id: string) => `/employee-position/${id}`,
      providesTags: (result, error, id) => [{ type: "EmployeePosition", id }],
    }),

    // ✅ Create position
    createPosition: builder.mutation({
      query: (data) => ({
        url: "/employee-position",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["EmployeePosition"], 
    }),

    // ✅ Update position
    updatePosition: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/employee-position/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "EmployeePosition", id },
        "EmployeePosition", // also refetch the list
      ],
    }),

    // ✅ Delete position
    deletePosition: builder.mutation({
      query: (id: string) => ({
        url: `/employee-position/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "EmployeePosition", id },
        "EmployeePosition", // also refetch the list
      ],
    }),
  }),
});

export const {
  useGetAllPositionsQuery,
  useGetPositionByIdQuery,
  useCreatePositionMutation,
  useUpdatePositionMutation,
  useDeletePositionMutation,
} = employeePositionApi;

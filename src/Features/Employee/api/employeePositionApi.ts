import { baseApi } from "@/Redux/baseApi";

export const employeePositionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ CREATE - Add new employee position
    createPosition: builder.mutation({
      query: (data) => ({
        url: "/employee-position",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["EmployeePosition"],
    }),

    // ✅ READ - Get all employee positions
    getAllPositions: builder.query({
      query: () => "/employee-position",
      providesTags: ["EmployeePosition"],
    }),

    // ✅ READ - Get single position by ID
    getPositionById: builder.query({
      query: (id: string) => `/employee-position/${id}`,
      providesTags: ["EmployeePosition"],
    }),

    // ✅ UPDATE - Edit employee position
    updatePosition: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/employee-position/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["EmployeePosition"],
    }),

    // ✅ DELETE - Remove employee position
    deletePosition: builder.mutation({
      query: (id: string) => ({
        url: `/employee-position/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["EmployeePosition"],
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

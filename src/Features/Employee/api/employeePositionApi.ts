import { fakeBaseApi } from "@/Redux/fakeBaseApi";


export const employeePositionApi = fakeBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ READ - Get all positions (from fakedata.json)
    getAllPositions: builder.query({
      query: () => "fakedata.json",
      transformResponse: (response: any) => ({
        data: response.employeePositions,
      }),
      providesTags: ["EmployeePosition"],
    }),

    // ✅ READ - Get position by ID
    getPositionById: builder.query({
      queryFn: async (id, _api, _extra, baseQuery) => {
        const result : any = await baseQuery("fakedata.json");
        if (result.error) return { error: result.error };
        const item = result.data.employeePositions.find(
          (pos: any) => pos._id === id
        );
        return { data: { data: item } };
      },
      providesTags: ["EmployeePosition"],
    }),

    // ✅ CREATE (simulate add)
    createPosition: builder.mutation({
      queryFn: async (newItem) => {
        console.log("Simulated add:", newItem);
        // fake a server delay
        await new Promise((r) => setTimeout(r, 500));
        return { data: { success: true, message: "Position added (fake)" } };
      },
      invalidatesTags: ["EmployeePosition"],
    }),

    // ✅ UPDATE (simulate edit)
    updatePosition: builder.mutation({
      queryFn: async ({ id, ...data }) => {
        console.log("Simulated update:", id, data);
        await new Promise((r) => setTimeout(r, 500));
        return { data: { success: true, message: "Position updated (fake)" } };
      },
      invalidatesTags: ["EmployeePosition"],
    }),

    // ✅ DELETE (simulate delete)
    deletePosition: builder.mutation({
      queryFn: async (id) => {
        console.log("Simulated delete:", id);
        await new Promise((r) => setTimeout(r, 500));
        return { data: { success: true, message: "Position deleted (fake)" } };
      },
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

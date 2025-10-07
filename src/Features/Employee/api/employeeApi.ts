import { fakeBaseApi } from "@/Redux/fakeBaseApi";


export const employeeApi = fakeBaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ✅ READ - Get all employees
    getAllEmployees: builder.query({
      query: () => "fakedata.json",
      transformResponse: (response: any) => ({
        data: response.employees,
      }),
      providesTags: ["employee"],
    }),

    // ✅ READ - Get employee by ID
    getEmployeeById: builder.query({
      queryFn: async (id, _api, _extra, baseQuery) => {
        const result : any = await baseQuery("fakedata.json");
        if (result.error) return { error: result.error };
        const employee = result.data.employees.find((emp: any) => emp._id === id);
        return { data: { data: employee } };
      },
      providesTags: ["employee"],
    }),

    // ✅ CREATE - Simulated
    createEmployee: builder.mutation({
      queryFn: async (newEmployee) => {
        console.log("🟢 Simulated create:", newEmployee);
        await new Promise((r) => setTimeout(r, 500));
        return { data: { success: true, message: "Employee created (fake)" } };
      },
      invalidatesTags: ["employee"],
    }),

    // ✅ UPDATE - Simulated
    updateEmployee: builder.mutation({
      queryFn: async ({ id, data }) => {
        console.log("🟡 Simulated update:", id, data);
        await new Promise((r) => setTimeout(r, 500));
        return { data: { success: true, message: "Employee updated (fake)" } };
      },
      invalidatesTags: ["employee"],
    }),

    // ✅ DELETE - Simulated
    deleteEmployee: builder.mutation({
      queryFn: async (id) => {
        console.log("🔴 Simulated delete:", id);
        await new Promise((r) => setTimeout(r, 500));
        return { data: { success: true, message: "Employee deleted (fake)" } };
      },
      invalidatesTags: ["employee"],
    }),
  }),
});

export const {
  useGetAllEmployeesQuery,
  useGetEmployeeByIdQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fakeBaseApi = createApi({
  reducerPath: "fakeBaseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }), // local JSON file base path
  tagTypes: ["EmployeePosition", "employee"], // ✅ add both
  endpoints: () => ({}),
});

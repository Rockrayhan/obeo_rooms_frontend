import { createSlice } from "@reduxjs/toolkit";
import type  { PayloadAction } from "@reduxjs/toolkit";
import type { EmployeeFormData } from "../types/employeeType";

interface EmployeeState {
  basicInfo: EmployeeFormData["employee"] | null;
  personalInfo: EmployeeFormData["personalInfo"] | null;
}

const initialState: EmployeeState = {
  basicInfo: null,
  personalInfo: null,
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    saveBasicInfo: (state, action: PayloadAction<EmployeeFormData["employee"]>) => {
      state.basicInfo = action.payload;
    },
    savePersonalInfo: (state, action: PayloadAction<EmployeeFormData["personalInfo"]>) => {
      state.personalInfo = action.payload;
    },
    clearEmployee: (state) => {
      state.basicInfo = null;
      state.personalInfo = null;
    },
  },
});

export const { saveBasicInfo, savePersonalInfo, clearEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;

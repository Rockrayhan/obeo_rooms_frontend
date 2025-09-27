import BasicInformation from "@/Features/Employee/Components/BasicInformation";
import EditBasicInformation from "@/Features/Employee/Components/EditBasicInformation";
import EditPersonalInfo from "@/Features/Employee/Components/EditPersonalInfo";
import CreateEmployeeLayout from "@/Features/Employee/Components/layout/CreateEmployeeLayout";
import PersonalInfo from "@/Features/Employee/Components/PersonalInfo";
import AddEmployee from "@/Features/Employee/pages/AddEmployee";
import AddEmployeePosition from "@/Features/Employee/pages/employee-position/AddEmployeePosition";
import AllEmployee from "@/Features/Employee/pages/AllEmployee";
import AllEmployeePosition from "@/Features/Employee/pages/employee-position/AllEmployeePosition";
import EditEmployeePosition from "@/Features/Employee/pages/employee-position/EditEmployeePosition";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AddEmployee />,
    children: [
      {
        path: "",
        element: <AllEmployee />,
      },
      // Routes with navbar
      {
        element: <CreateEmployeeLayout />,
        children: [
          {
            path: "/basic-information",
            element: <BasicInformation />,
          },
          {
            path: "personal-information",
            element: <PersonalInfo />,
          },
        ],
      },

      {
        path: "/employee/:id/edit-basic-information",
        element: <EditBasicInformation />,
      },
      {
        path: "/employee/:id/edit-personal-information",
        element: <EditPersonalInfo />,
      },


      // employee position
      {
        path: "/employee-position-all",
        element: <AllEmployeePosition />,
      },
      {
        path: "/employee-position-add",
        element: <AddEmployeePosition />,
      },
      {
        path: "/employee-position/:id",
        element: <EditEmployeePosition />,
      },
    ],
  },
]);

export default router;

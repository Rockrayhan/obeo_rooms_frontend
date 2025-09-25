import BasicInformation from "@/Features/Employee/Components/BasicInformation";
import EditBasicInformation from "@/Features/Employee/Components/EditBasicInformation";
import EditPersonalInfo from "@/Features/Employee/Components/EditPersonalInfo";
import CreateEmployeeLayout from "@/Features/Employee/Components/layout/CreateEmployeeLayout";
import PersonalInfo from "@/Features/Employee/Components/PersonalInfo";
import AddEmployee from "@/Features/Employee/pages/AddEmployee";
import AllEmployee from "@/Features/Employee/pages/AllEmployee";
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
    ],
  },
]);

export default router;

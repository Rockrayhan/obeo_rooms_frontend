import BasicInformation from "@/Features/Employee/Components/BasicInformation";
import PersonalInfo from "@/Features/Employee/Components/PersonalInfo";
import AddEmployee from "@/Features/Employee/pages/AddEmployee";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AddEmployee />,
    children: [
      {
        path: "",
        element: <BasicInformation />,
      },
      {
        path: "personal-information",
        element: <PersonalInfo />,
      },
    ],
  },
]);

export default router;

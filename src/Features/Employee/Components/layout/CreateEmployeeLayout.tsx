import { Outlet } from "react-router";
import EmployeeNavbar from "./EmployeeNavbar";


const CreateEmployeeLayout = () => {
  return (
    <div className="p-5">
      <EmployeeNavbar />
      <Outlet />
    </div>
  );
};

export default CreateEmployeeLayout;

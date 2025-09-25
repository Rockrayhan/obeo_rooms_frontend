import { Outlet } from "react-router";
import EmployeeNavbar from "../Components/layout/EmployeeNavbar";

const AddEmployee = () => {
  return (
    <div className="p-5">
      <EmployeeNavbar />
      <Outlet />
    </div>
  );
};

export default AddEmployee;

import { Outlet } from "react-router";
import EmployeeNavbar from "../Components/layout/EmployeeNavbar";

const AddEmployee = () => {
  return (
    <div className="p-5">
      <EmployeeNavbar />
      <h1 className="text-2xl font-bold px-6"> Add Employee page </h1>
      <Outlet />
    </div>
  );
};

export default AddEmployee;

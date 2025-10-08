import { Outlet } from "react-router";
import EmployeeNavbar from "./EmployeeNavbar";


const CreateEmployeeLayout = () => {
  return (
    <div className="p-5">
      <EmployeeNavbar />
      <h1 className="text-3xl mt-4 px-8"> Add Employee </h1>
      <Outlet />
    </div>
  );
};

export default CreateEmployeeLayout;

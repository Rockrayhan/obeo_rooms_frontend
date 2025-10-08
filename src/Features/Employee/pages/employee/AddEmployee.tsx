import { Outlet } from "react-router";
import Navbar from "../../Components/layout/Navbar";

const AddEmployee = () => {
  return (
    <div>
      <Navbar />
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default AddEmployee;

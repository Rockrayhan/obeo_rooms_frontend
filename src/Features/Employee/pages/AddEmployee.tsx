import { Link, Outlet } from "react-router";

const AddEmployee = () => {
  return (
    <div>
      <div className="bg-slate-500 text-white px-6 py-4 underline">
        <Link to="/"> All Employee page </Link>
      </div>
      <div className="p-5">
        <Outlet />
      </div>
    </div>
  );
};

export default AddEmployee;

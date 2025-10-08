import { NavLink } from "react-router";

const EmployeeNavbar = () => {
  return (
<div className="flex gap-2">
      <NavLink to="/basic-information">
        {({ isActive }) => (
          <button
            className={`p-2 text-white rounded-md transition-colors duration-200 ${
              isActive ? "bg-black" : "bg-sky-600 hover:bg-sky-700"
            }`}
          >
            Basic Information
          </button>
        )}
      </NavLink>

      <NavLink to="/personal-information">
        {({ isActive }) => (
          <button
            className={`p-2 text-white rounded-md transition-colors duration-200 ${
              isActive ? "bg-black" : "bg-sky-600 hover:bg-sky-700"
            }`}
          >
            Personal Information
          </button>
        )}
      </NavLink>
    </div>
  );
};

export default EmployeeNavbar;
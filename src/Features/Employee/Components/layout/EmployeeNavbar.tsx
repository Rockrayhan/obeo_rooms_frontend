import { NavLink } from "react-router";

const EmployeeNavbar = () => {
  return (
    <div className="flex flex-col items-start mb-8 border border-gray-300 p-3">
      <div className="flex items-center w-full max-w-md relative">
        {/* Progress Line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-300 -z-10">
          <div 
            className="h-full bg-gray-800 transition-all duration-300"
            style={{ width: '50%' }}
          ></div>
        </div>
        
        {/* Step 1 */}
        <div className="flex flex-col items-center flex-1">
          <NavLink
            to="/basic-information"
            className={({ isActive }) =>
              `w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-gray-800 border-blue-600 text-white"
                  : "bg-white border-gray-300 text-gray-600"
              }`
            }
          >
            1
          </NavLink>
          <span className="mt-2 text-sm font-medium text-gray-700 text-center">
            Basic Info
          </span>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center flex-1">
          <NavLink
            to="/personal-information"
            className={({ isActive }) =>
              `w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-gray-800 border-blue-600 text-white"
                  : "bg-white border-gray-300 text-gray-600"
              }`
            }
          >
            2
          </NavLink>
          <span className="mt-2 text-sm font-medium text-gray-700 text-center">
            Personal Info
          </span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeNavbar;
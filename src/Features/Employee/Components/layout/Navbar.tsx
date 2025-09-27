import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="bg-slate-500 text-white px-6 py-4 underline flex gap-3">
      <Link to="/"> All Employee page </Link>
      <Link to="/employee-position-all"> Employee position list </Link>
    </div>
  );
};

export default Navbar;

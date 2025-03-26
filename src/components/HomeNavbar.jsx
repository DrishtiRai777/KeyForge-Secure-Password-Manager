import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <span>Key</span>
        <span className="text-blue-500">𓂀Forge</span>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 ml-auto">
        <button className="bg-blue-500 font-semibold text-white px-5 py-2 border-2 border-black rounded-lg hover:bg-blue-600">
          <NavLink 
              to="/register" 
          >
            Sign up
          </NavLink>
        </button>
        <button className="bg-blue-500 font-semibold text-white px-5 py-2 border-2 border-black rounded-lg hover:bg-blue-600">
          <NavLink 
              to="/login" 
          >
            Sign in
          </NavLink>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

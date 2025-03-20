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
        <button className="bg-sky-400 font-semibold text-black px-5 py-2 border-2 border-black rounded-lg hover:bg-gray-50">
          <NavLink 
              to="/register" 
              className={({ isActive }) => 
              `hover:text-blue-400 transition ${isActive ? "text-white" : ""}`
              }
          >
            Sign up
          </NavLink>
        </button>
        <button className="bg-sky-400 font-semibold text-black px-5 py-2 border-2 border-black rounded-lg">
          <NavLink 
              to="/login" 
              className={({ isActive }) => 
              `hover:text-blue-400 transition ${isActive ? "text-white-500" : ""}`
              }
          >
            Sign in
          </NavLink>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

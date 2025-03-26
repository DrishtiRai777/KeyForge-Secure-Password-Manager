import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center shadow-md">
      {/* Logo */}
      <div className="text-2xl font-bold">
        <span>Key</span>
        <span className="text-blue-500">𓂀Forge</span>
      </div>

      {/* Navigation Links */}
      <ul className="flex space-x-6">
        <NavLink 
          to="/" 
          className={({ isActive }) =>
            `transition-all duration-200 border-b-2 pb-1 ${
              isActive
                ? "text-blue-500 border-blue-500"
                : "border-transparent hover:text-blue-400 hover:border-blue-400"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink 
          to="/password" 
          className={({ isActive }) =>
            `transition-all duration-200 border-b-2 pb-1 ${
              isActive
                ? "text-blue-500 border-blue-500"
                : "border-transparent hover:text-blue-400 hover:border-blue-400"
            }`
          }
        >
          Passwords
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) =>
            `transition-all duration-200 border-b-2 pb-1 ${
              isActive
                ? "text-blue-500 border-blue-500"
                : "border-transparent hover:text-blue-400 hover:border-blue-400"
            }`
          }
        >
          About Us
        </NavLink>
        <NavLink 
          to="/contact" 
          className={({ isActive }) =>
            `transition-all duration-200 border-b-2 pb-1 ${
              isActive
                ? "text-blue-500 border-blue-500"
                : "border-transparent hover:text-blue-400 hover:border-blue-400"
            }`
          }
        >
          Contact
        </NavLink>
        <NavLink 
          to="/faq" 
          className={({ isActive }) =>
            `transition-all duration-200 border-b-2 pb-1 ${
              isActive
                ? "text-blue-500 border-blue-500"
                : "border-transparent hover:text-blue-400 hover:border-blue-400"
            }`
          }
        >
          FAQ
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;

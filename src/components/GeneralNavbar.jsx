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
            `hover:text-blue-400 transition ${isActive ? "text-blue-500" : ""}`
          }
        >
          Home
        </NavLink>
        <NavLink 
          to="/password" 
          className={({ isActive }) => 
            `hover:text-blue-400 transition ${isActive ? "text-blue-500" : ""}`
          }
        >
          Passwords
        </NavLink>
        <NavLink 
          to="/about" 
          className={({ isActive }) => 
            `hover:text-blue-400 transition ${isActive ? "text-blue-500" : ""}`
          }
        >
          About Us
        </NavLink>
        <NavLink 
          to="/contact" 
          className={({ isActive }) => 
            `hover:text-blue-400 transition ${isActive ? "text-blue-500" : ""}`
          }
        >
          Contact
        </NavLink>
        <NavLink 
          to="/faq" 
          className={({ isActive }) => 
            `hover:text-blue-400 transition ${isActive ? "text-blue-500" : ""}`
          }
        >
          FAQ
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;

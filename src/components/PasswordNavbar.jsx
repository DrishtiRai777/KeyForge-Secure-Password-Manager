import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include", 
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Logged out successfully");
        navigate("/login"); // Redirect to login page
      } else {
        console.error("Logout failed:", data.error);
      }
    } catch (error) {
      console.error("Logout request failed:", error);
    }
  };

  return (
    <nav className="w-96 h-screen bg-black text-white">
      <div className="flex flex-col items-center px-4 py-5 h-full mx-7 my-7 rounded-lg">
        {/* Logo */}
        <div className="logo font-bold text-2xl mb-8">
          <span>Key</span>
          <span className="text-blue-500">𓂀Forge</span>
        </div>

        {/* Navigation Links */}
        <ul className="flex flex-col gap-6 w-full">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "hover:font-bold"
              }
            >
              <div className="flex items-center gap-4">
                <img src="icons2/home.png" alt="Home" className="w-5 h-5" />
                Home
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/password"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "hover:font-bold"
              }
            >
              <div className="flex items-center gap-4">
                <img src="icons2/passwords.png" alt="Passwords" className="w-6 h-6" />
                Passwords
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "hover:font-bold"
              }
            >
              <div className="flex items-center gap-4">
                <img
                  src="icons2/About us.png"
                  alt="About Us"
                  className="w-5 h-5"
                />
                About Us
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive ? "text-blue-500 font-bold" : "hover:font-bold"
              }
            >
              <div className="flex items-center gap-4">
                <img
                  src="icons2/Contact us.png"
                  alt="Contact"
                  className="w-6 h-6"
                />
                Contact
              </div>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/faq"
              className={({ isActive }) =>
                isActive ? "text-blue-500" : "hover:font-bold"
              }
            >
              <div className="flex items-center gap-4">
                <img src="icons2/faq.png" alt="FAQ" className="w-6 h-6" />
                FAQ
              </div>
            </NavLink>
          </li>
        </ul>

        {/* Buttons */}
        <button onClick={handleLogout} className="flex items-center gap-4 bg-blue-500 w-32 p-2 rounded-md hover:bg-blue-600 mt-6">
          <img src="icons/log-out.png" alt="Logout" className="w-6 h-6" />
          Log-out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

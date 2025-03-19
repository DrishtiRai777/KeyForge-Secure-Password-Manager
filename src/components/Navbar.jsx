const Navbar = () => {
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
            <div className="flex items-center gap-4">
              <img src="icons/home.png" alt="Home" className="w-6 h-6" />
              <a className="hover:font-bold" href="/">Home</a>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-4">
              <img src="icons/pswd.png" alt="Passwords" className="w-6 h-6" />
              <a className="hover:font-bold" href="/passwords">Passwords</a>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-4">
              <img src="icons/About Us.png" alt="About Us" className="w-6 h-6"/>
              <a className="hover:font-bold" href="/about">About Us</a>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-4">
              <img src="icons/Contact.png" alt="Contact" className="w-6 h-6"/>
              <a className="hover:font-bold" href="/contact">Contact</a>
            </div>
          </li>
          <li>
            <div className="flex items-center gap-4">
              <img src="icons/faq.png" alt="FAQ" className="w-6 h-6"/>
              <a className="hover:font-bold" href="/faq">FAQ</a>
            </div>
          </li>

          <button className="flex items-center gap-4 bg-sky-400 w-32 p-2 rounded-md hover:bg-sky-300">
            <img src="icons/log-out.png" alt="" className="w-6 h-6"/>
            Log-out
          </button>

          <button className="flex items-center gap-2 bg-sky-400 w-32 h-10 p-2 rounded-md fixed bottom-14 hover:bg-sky-300">
            <img src="icons/github.png" alt="" className="w-6 h-6"/>
            <a href="#" className="text-lg">Github</a>
          </button>

        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

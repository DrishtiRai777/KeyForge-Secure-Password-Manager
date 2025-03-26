import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Home = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const tagline = "Unlock Security, Forge Trust";

  useEffect(() => {
    if (index < tagline.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + tagline[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black opacity-90"></div>
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-[120px] opacity-40"
      ></motion.div>
      <motion.div
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute bottom-1/5 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[120px] opacity-40"
      ></motion.div>
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-10"></div>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute w-80 h-80 bg-blue-400 rounded-full filter blur-[80px] opacity-20"
      ></motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center py-8 px-6 -mt-12">
        {/* Title */}
        <motion.h1
          className="text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Welcome to Key<span className="text-blue-500">𓂀Forge</span>
        </motion.h1>

        {/* Typing Effect*/}
        <motion.p
          className="text-lg text-gray-300 mb-8 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          {text} 
        </motion.p>

        {/* feat. List */}
        <motion.ul
          className="list-disc text-left text-lg space-y-4 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          {["End-to-End Encryption", "Two-Factor Authentication (2FA)", "User-Friendly Interface", "Secure Login with JWT", "Save unlimited Passwords"].map((feature, i) => (
            <motion.li
              key={i}
              className="transition-transform duration-500 hover:translate-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 + i * 0.5 }}
            >
              {feature}
            </motion.li>
          ))}
        </motion.ul>

        {/* Signup Button*/}
        <motion.div
          className="mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4 }}
        >
          <Link to="/register">
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 transition duration-300 text-white rounded-lg text-lg font-semibold">
              Get Started
            </button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="mt-12 grid grid-cols-3 gap-12 text-white max-w-4xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 5 }}
        >
          {[
            { value: "10,000+", label: "Users Secured", color: "text-blue-400" },
            { value: "98%", label: "User Satisfaction", color: "text-purple-400" },
            { value: "24/7", label: "Support Available", color: "text-green-400" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <motion.div
                className={`text-4xl font-bold ${stat.color}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 5.5 + i * 0.5 }}
              >
                {stat.value}
              </motion.div>
              <div className="mt-2 text-lg">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Home;

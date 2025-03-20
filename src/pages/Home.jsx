import { motion } from "framer-motion";

const Home = () => {
  return (
    // Background
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black opacity-90"></div>

      {/* Floating Glowing Blobs */}
      <motion.div 
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }} 
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-[120px] opacity-40"
      ></motion.div>

      <motion.div 
        animate={{ x: [0, -30, 0], y: [0, 20, 0] }} 
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-[120px] opacity-40"
      ></motion.div>

      {/* Subtle Starfield Effect */}
      <div className="absolute inset-0 bg-[url('/stars.png')] opacity-10"></div>

      {/* Pulsating Center Glow */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }} 
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="absolute w-80 h-80 bg-blue-400 rounded-full filter blur-[80px] opacity-20"
      ></motion.div>

      {/* Main Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-extrabold tracking-wider text-white">
          Welcome to <span className="text-blue-400">KeyForge</span>
        </h1>
        <p className="mt-4 text-lg text-gray-300">
          Unlock Security, Forge Trust.
        </p>
      </div>
    </div>
  )
}

export default Home

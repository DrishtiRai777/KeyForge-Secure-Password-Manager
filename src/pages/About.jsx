import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <div className="h-screen bg-black text-white relative flex flex-col items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black opacity-90"></div>
        <div className="absolute top-1/3 left-1/4 w-56 h-56 bg-blue-500 rounded-full filter blur-3xl opacity-25"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-purple-500 rounded-full filter blur-3xl opacity-25"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl text-center px-6">
          {/* Title */}
          <motion.h1
            className="text-5xl font-bold text-blue-500 mb-4 tracking-wide"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            About Us
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg text-gray-300 mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <span className="text-blue-400 font-semibold">KeyForge</span> is built to make online security effortless. 
            We prioritize privacy, encryption, and ease of use to keep your passwords safe.
          </motion.p>

          {/* Feats */}
          <motion.div
            className="grid grid-cols-2 gap-6 text-left text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {[
              { title: "🔒 AES-256 Encryption", desc: "Top-tier security to keep your credentials safe." },
              { title: "🚀 Zero-Knowledge", desc: "Only you can access your data—no one else." },
              { title: "🛡️ TOTP-Based Recovery", desc: "Extra security with two-factor authentication." },
              { title: "✨ User-Friendly", desc: "A seamless experience for managing passwords." }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all duration-300 shadow-md"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
              >
                <p className="text-blue-400 text-xl">{item.title.split(" ")[0]}</p>
                <div>
                  <p className="font-semibold">{item.title.replace("🔒", "").replace("🚀", "").replace("🛡️", "").replace("✨", "")}</p>
                  <p className="text-gray-400 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            <p className="text-lg text-gray-300">
              Join thousands of users who trust <span className="text-blue-400 font-semibold">KeyForge</span> today!
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default About;

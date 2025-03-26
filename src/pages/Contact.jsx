import { motion } from "framer-motion";

const Contact = () => {
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
            className="text-5xl font-bold text-blue-400 mb-4"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Contact Us
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg text-gray-300 mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Need help? Our support team is here to assist you.
          </motion.p>

          {/* Contact Info... */}
          <div className="space-y-4">
            {[
              { icon: "📧", title: "Email", info: "support@keyforge.com" },
              { icon: "📞", title: "Phone", info: "+1 (800) 123-4567" },
              { icon: "💬", title: "Live Chat", info: "Available 9 AM - 6 PM (UTC)" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4 text-gray-300 text-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.2 }}
              >
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-gray-400 text-sm">{item.info}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Help Center */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <p className="text-lg text-gray-300">
              Need quick answers? Visit our{" "}
              <a
                href="/faq"
                className="text-blue-400 hover:underline transition-colors duration-300"
              >
                Help Center
              </a>{" "}
              for FAQs & guides.
            </p>
          </motion.div>

          {/* Contact Us btn */}
          <motion.button
            className="mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get in Touch
          </motion.button>
        </div>
      </div>
    </>
  );
};

export default Contact;

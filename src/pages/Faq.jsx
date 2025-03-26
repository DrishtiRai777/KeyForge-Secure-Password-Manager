import { useState } from "react";
import { motion } from "framer-motion";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#111827] text-white flex items-center justify-center overflow-hidden">
      {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-black opacity-90"></div>

        {/* Glowing blobs effect */}
        <div className="absolute top-1/3 left-1/4 w-56 h-56 bg-blue-500 rounded-full filter blur-3xl opacity-25"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-purple-500 rounded-full filter blur-3xl opacity-25"></div>

        {/* Subtle noise texture */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>
      {/* FAQ Content */}
      <div className="relative z-10 p-10 w-full max-w-6xl bg-opacity-90 rounded-lg">
        {/* Title */}
        <motion.h1
          className="text-4xl font-extrabold text-blue-400 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Frequently Asked Questions
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-gray-300 text-center mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          Have questions? We’re here to help!
        </motion.p>

        {/* FAQ List */}
        <div className="mt-8 space-y-4">
          {[
            {
              question: "How does KeyForge keep my passwords secure?",
              answer:
                "We use AES-256 encryption to ensure your passwords are securely stored. Only you can decrypt your data, and we never store your master password.",
            },
            {
              question: "What is Two-Factor Authentication (2FA)?",
              answer:
                "2FA adds an extra layer of security. You will need a code from your phone in addition to your password to access your account.",
            },
            {
              question: "Can I recover my password if I forget it?",
              answer:
                "Yes, you can use Two-Factor Authentication (TOTP) for password recovery while keeping your data secure.",
            },
            {
              question: "Is KeyForge available on mobile?",
              answer:
                "Currently, KeyForge is designed for desktop, but mobile apps are planned for the future.",
            },
            {
              question: "Can I store other sensitive information in KeyForge?",
              answer:
                "Yes, besides passwords, you can securely store notes, credit card details, and other confidential data.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gray-900 rounded-lg p-4 shadow-lg hover:shadow-blue-500/50 transition-all duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 + index * 0.3 }}
            >
              <div
                className="flex justify-between items-center cursor-pointer text-white"
                onClick={() => toggleAnswer(index)}
              >
                <h3 className="text-lg font-semibold">{faq.question}</h3>
                <span
                  className={`transform transition-transform text-blue-400 ${activeIndex === index ? "rotate-180" : ""}`}
                >
                  ▼
                </span>
              </div>
              {activeIndex === index && (
                <motion.p
                  className="mt-2 text-gray-300"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.5 }}
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 4 }}
        >
          <p className="text-gray-300">
            Didn’t find the answer you were looking for?{" "}
            <a href="/contact" className="text-blue-400 hover:underline">
              Contact Us
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQ;

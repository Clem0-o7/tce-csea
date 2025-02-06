"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSpring, animated, config } from "react-spring";
import { FaLightbulb, FaUsers, FaStar } from "react-icons/fa";

const AnimatedIcon = ({ icon: Icon, delay }) => {
  const props = useSpring({
    from: { opacity: 0, transform: "scale(0.5) rotate(-45deg)" },
    to: { opacity: 1, transform: "scale(1) rotate(0deg)" },
    delay,
    config: config.wobbly,
  });

  return (
    <animated.div style={props} className="mb-4">
      <Icon className="text-5xl text-blue-500 dark:text-blue-400" />
    </animated.div>
  );
};

const AnimatedCard = ({ title, description, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  const props = useSpring({
    transform: isHovered ? "scale(1.08)" : "scale(1)",
    boxShadow: isHovered
      ? "0 20px 40px rgba(0, 0, 0, 0.3)"
      : "0 10px 20px rgba(0, 0, 0, 0.1)",
    config: { tension: 300, friction: 20 }, // Adjusted config for smoother transition
  });

  return (
    <animated.div
      style={props}
      className="relative bg-white/20 dark:bg-gray-900/30 backdrop-blur-lg p-6 rounded-2xl border border-white/20 dark:border-gray-800 shadow-lg transition-all overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-10 rounded-2xl" />
      <AnimatedIcon icon={Icon} delay={300} />
      <h3 className="font-semibold text-2xl mb-3 text-gray-800 dark:text-gray-200">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300">{description}</p>
    </animated.div>
  );
};

export default function AboutSection() {
  return (
    <section className="container mx-auto px-6 py-20 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="max-w-4xl"
      >
        <h2 className="font-extrabold text-4xl sm:text-5xl text-gray-800 dark:text-gray-200 tracking-tight">
          About CSEA
        </h2>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mt-4"
        >
          The Computer Science and Engineering Association (CSEA) is a dynamic,
          student-led organization dedicated to fostering innovation,
          professional growth, and collaborative learning. We empower students
          to explore cutting-edge technology and thrive in the tech industry.
        </motion.p>
      </motion.div>

      <motion.div
        className="grid gap-8 mt-12 sm:grid-cols-2 lg:grid-cols-2 w-full max-w-5xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        <AnimatedCard
          title="Vision"
          description="Create future-ready tech leaders and innovators."
          icon={FaLightbulb}
        />
        <AnimatedCard
          title="Values"
          description="Innovation, Collaboration, Excellence."
          icon={FaStar}
        />
        <AnimatedCard
          title="Community"
          description="Join a thriving network of passionate tech enthusiasts."
          icon={FaUsers}
        />
        <AnimatedCard
          title="Mission"
          description="Empower students to succeed in the tech industry."
          icon={FaStar}
        />
      </motion.div>
    </section>
  );
}

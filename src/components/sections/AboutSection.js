'use client'

import { useEffect, useState } from 'react'
import { useSpring, animated, config } from 'react-spring'
import { useInView } from 'react-intersection-observer'
import { FaLightbulb, FaUsers, FaStar } from 'react-icons/fa'

const AnimatedIcon = ({ icon: Icon, delay }) => {
  const props = useSpring({
    from: { opacity: 0, transform: 'scale(0.5) rotate(-45deg)' },
    to: { opacity: 1, transform: 'scale(1) rotate(0deg)' },
    delay,
    config: config.wobbly,
  })

  return (
    <animated.div style={props}>
      <Icon className="text-4xl mb-4 text-blue-500" />
    </animated.div>
  )
}

const AnimatedCard = ({ title, description, icon: Icon }) => {
  const [isHovered, setIsHovered] = useState(false)
  const props = useSpring({
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isHovered
      ? '0 10px 20px rgba(0, 0, 0, 0.2)'
      : '0 5px 10px rgba(0, 0, 0, 0.1)',
  })

  return (
    <animated.div
      style={props}
      className="bg-white dark:bg-gray-800 p-6 rounded-lg transition-colors"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatedIcon icon={Icon} delay={300} />
      <h3 className="font-semibold text-xl mb-3 text-gray-800 dark:text-gray-200">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </animated.div>
  )
}

export default function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  const titleProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(50px)',
    config: config.molasses,
  })

  const descriptionProps = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? 'translateY(0)' : 'translateY(30px)',
    delay: 300,
    config: config.molasses,
  })

  return (
    <div ref={ref} className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
      <div className="space-y-8 max-w-4xl">
        <animated.h2 style={titleProps} className="font-bold text-3xl sm:text-5xl text-gray-800 dark:text-gray-200">
          About CSEA
        </animated.h2>
        
        <animated.p style={descriptionProps} className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
          The Computer Science and Engineering Association (CSEA) is a dynamic student-led organization 
          dedicated to fostering technological innovation, professional growth, and collaborative learning. 
          We provide a platform for students to explore cutting-edge technologies, develop practical skills, 
          and connect with industry professionals.
        </animated.p>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          <AnimatedCard
            title="Vision"
            description="Create future-ready tech leaders and innovators"
            icon={FaLightbulb}
          />
          <AnimatedCard
            title="Values"
            description="Innovation, Collaboration, Excellence"
            icon={FaStar}
          />
          <AnimatedCard
            title="Community"
            description="Join a thriving network of passionate tech enthusiasts"
            icon={FaUsers}
          />
          <AnimatedCard
            title="Mission"
            description="Empower students to succeed in the tech industry"
            icon={FaStar}
          />
        </div>
      </div>
    </div>
  )
}


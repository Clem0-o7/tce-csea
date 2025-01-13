import { motion } from 'framer-motion'
import React from 'react'

const ScrollProgressIndicator = ({ scrollIndicatorWidth }) => {
  return (
    <motion.div 
      className="fixed top-0 left-0 h-1 bg-blue-500 z-50" 
      style={{ 
        width: scrollIndicatorWidth,
        transformOrigin: 'left center' 
      }} 
    />
  )
}

export default ScrollProgressIndicator
import React from 'react';
import { motion } from 'framer-motion';

const LineAnimation = () => {
  return (
    <motion.div
      className="line"
      initial={{ x: '-100%' }}
      animate={{ x: '100%' }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'loop',
      }}
    />
  );
};

export default LineAnimation;

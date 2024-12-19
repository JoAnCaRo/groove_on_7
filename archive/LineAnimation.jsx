import React from 'react';
import { motion } from 'framer-motion';

/* Componente React que utiliza framer-motion para animar las líneas al hacer scroll */
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

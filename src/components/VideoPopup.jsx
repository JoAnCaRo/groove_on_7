import React from 'react';
import { motion } from 'framer-motion';

const VideoPopup = ({ videoUrl, onClose }) => {
  if (!videoUrl) return null;

  return (
    <motion.div
      className={`video-popup ${videoUrl ? 'show' : ''}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 1 }}
    >
      <div className="video-popup-content">
        <iframe src={videoUrl} width="1280" height="720" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title="Live Session Video"></iframe>
        {}
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default VideoPopup;


/* Importa React, hooks y biblioteca Framer Motion */
import React from 'react';
import { motion } from 'framer-motion';

/* Componente que muestra video en un popup con animaciones de aparición y desaparición. Incluye una función para cerrarlo. */
const VideoPopup = ({ videoUrl, onClose }) => {
  if (!videoUrl) return null;

  return (
    <motion.div className="video-popup" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5 }}>
      <div className="video-popup-content">

        {/* Contenedor iframe con el video */}
        <iframe src={videoUrl} width="1280" height="720" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen title="Live Session Video"></iframe>

        {/* Botón para cerrar el popup */}
        <button className="close-button" onClick={onClose}>
          Close
        </button>

      </div>
    </motion.div>
  );
};

export default VideoPopup;

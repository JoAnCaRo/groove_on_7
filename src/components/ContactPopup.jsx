/* Importa React y Motion archivos necesario */
import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from './ContactForm';

/* Componente de React que muestra una ventana emergente animada para mostrar un formulario de contacto. Utiliza la biblioteca Framer Motion para animaciones de entrada y salida */
const ContactPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div className="popup-overlay" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5 }}>
      <div className="popup-content-form">
        {/* Formulario de contacto */}
        <ContactForm onClose={onClose} />
      </div>
    </motion.div>
  );
};

export default ContactPopup;

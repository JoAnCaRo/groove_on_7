import React, { useState } from 'react';
import PrivacyPolicyPopup from './PrivacyPolicyPopup';

/* Componente Footer que muestra el pie de página y maneja la ventana emergente de política de privacidad */
const Footer = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Mneja el estado de visibilidad de la ventana emergente

  return (
    <footer className="footer">
      <p>&copy; 2024 Groove on 7". All rights reserved.</p>
      <button className="privacy-link" onClick={() => setIsPopupOpen(true)}>
        Privacy Policy
      </button>

      {/* Ventana emergente */}
      <PrivacyPolicyPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </footer>
  );
};

export default Footer;

import React, { useState } from 'react';
import PrivacyPolicyPopup from './PrivacyPolicyPopup';

const Footer = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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

/* import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Groove on 7". All rights reserved.</p>
      <a href="/privacy-policy.html" className="privacy-link">
        Privacy Policy
      </a>
    </footer>
  );
};

export default Footer;
 */

import React, { useState, useEffect } from 'react';
import PrivacyPolicyPopup from './PrivacyPolicyPopup';

const Footer = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [privacyContent, setPrivacyContent] = useState('');

  useEffect(() => {
    if (isPopupOpen) {
      // Cargar el contenido de privacy-policy.html
      fetch('/privacy-policy.html')
        .then((response) => response.text())
        .then((data) => setPrivacyContent(data))
        .catch((error) => console.error('Error fetching privacy policy:', error));
    }
  }, [isPopupOpen]);

  return (
    <footer className="footer">
      <p>&copy; 2024 Groove on 7". All rights reserved.</p>
      <button className="privacy-link" onClick={() => setIsPopupOpen(true)}>
        Privacy Policy
      </button>

      {/* Ventana emergente */}
      <PrivacyPolicyPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        content={privacyContent} // Pasar el contenido cargado al popup
      />
    </footer>
  );
};

export default Footer;

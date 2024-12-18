/* Importa React y Motion */
import React from 'react';
import { motion } from 'framer-motion';
import '../styles/privacy-policy.css'; // Archivo de estilos para este componente

/* Componente React que muestra una ventana emergente animada con la política de privacidad.  */
const PrivacyPolicyPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div className="popup-overlay" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5 }}>
      <div className="privacy-popup-content">
        <h4 className="privacy-popup-title">Privacy Policy</h4>
        <div className="privacy-content">
          <p>Effective Date: December 2024</p>

          <h2>Who We Are</h2>
          <p>
            This application, <strong>GROOVE ON 7"</strong>, is operated by <strong>Jose Carmona</strong>. We are committed to protecting your privacy and handling your data transparently.
          </p>

          <h2>What Data We Collect</h2>
          <p>When you use our app, we may collect the following data from you:</p>
          <ul>
            <li>- Basic profile information from Spotify (name, email)</li>
            <li>- Playlist information (playlist names, track details)</li>
          </ul>

          <h2>How We Use Your Data</h2>
          <p>The data collected is used exclusively for the following purposes:</p>
          <ul>
            <li>- To allow you to log in to your Spotify account</li>
            <li>- To enable pre-listening of tracks from your playlists</li>
            <li>- To provide redirection to Spotify for full track playback</li>
            <li>- To allow you to copy playlist links for sharing</li>
          </ul>

          <h2>How We Protect Your Data</h2>
          <p>
            We use industry-standard security measures to protect your data, such as encryption and secure access controls. Your Spotify login credentials (email and password) are handled securely
            through Spotify's authorization process, and we do not store this information.
          </p>

          <h2>Third-Party Services</h2>
          <p>
            We use the Spotify API to access your playlists and track details. Your data is processed according to Spotify’s{' '}
            <a href="https://www.spotify.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            .
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>- Access your data</li>
            <li>- Request data deletion</li>
            <li>- Withdraw consent for data processing</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have any questions, contact us at <a href="mailto:grooveon7official@gmail.com">grooveon7official@gmail.com</a>.
          </p>

          <h2>Changes to This Policy</h2>
          <p>We may update this Privacy Policy periodically. We will notify you of any significant changes.</p>

          <p>
            <a href="https://joancaro.github.io/groove_on_7/">Return to Home</a>
          </p>
        </div>
        <button className="close-popup-button-privacy" onClick={onClose}>
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicyPopup;






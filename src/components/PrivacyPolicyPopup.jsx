import React from 'react';
import { motion } from 'framer-motion';
import '../styles/privacy-policy.css'; // Asegúrate de tener un archivo de estilos para este componente

const PrivacyPolicyPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <motion.div className="popup-overlay" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.5 }}>
      <div className="popup-content">
        <h4 className="popup-title">Privacy Policy</h4>
        <div className="privacy-content">
          <p>Effective Date: December 2024</p>

          <h2>Who We Are</h2>
          <p>
            This application, <strong>GROOVE ON 7"</strong>, is operated by <strong>Jose Carmona</strong>. We are committed to protecting your privacy and handling your data transparently.
          </p>

          <h2>What Data We Collect</h2>
          <p>When you use our app, we may collect the following data from you:</p>
          <ul>
            <li>- Basic profile information (name, email, etc.)</li>
            <li>- Playlist information from Tidal</li>
            <li>- Tracks selected for playlist creation</li>
          </ul>

          <h2>How We Use Your Data</h2>
          <p>The data collected is used exclusively for the following purposes:</p>
          <ul>
            <li>- To allow you to view and interact with your playlists</li>
            <li>- To create custom playlists based on your preferences</li>
            <li>- To improve the app functionality</li>
          </ul>

          <h2>How We Protect Your Data</h2>
          <p>We use industry-standard security measures to protect your data, such as encryption and secure access controls.</p>

          <h2>Third-Party Services</h2>
          <p>
            We use the Tidal API to access your playlists. Your data is processed according to Tidal’s{' '}
            <a href="https://tidal.com/privacy" target="_blank" rel="noopener noreferrer">
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
            <a href="/">Return to Home</a>
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

import React from 'react';
import { useScrollContext } from '../context/ScrollContext';

const Contact = () => {
  const { sections } = useScrollContext(); // Obtener las referencias del contexto

  return (
    <section id="contact" className="contact-section" ref={sections.contact}>
      <div className="contact-content">
        <h2>
          DISCOVER THE BEST MUSIC IN 7” FORMAT CURATED AND MIXED WITH LOVE <br />
          ☮︎
        </h2>
        <p>Get in touch for collaborations or bookings.</p>
      </div>
      <div className="contact-container">
        <button className="contact-button">CONTACT</button>
      </div>
      <div>
        <h1 className="main-title-black">GROOVE ON 7"</h1>
      </div>
      <button className="social-media">
        <img src="img/icons/instagram.svg" alt="Instagram" />
      </button>
    </section>
  );
};

export default Contact;


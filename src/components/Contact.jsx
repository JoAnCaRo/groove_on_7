import React, { useState, useRef, useEffect } from 'react';
import { useScrollContext } from '../context/ScrollContext';
import ContactPopup from './ContactPopup';
import InstagramIcon from '../assets/icons/instagram.svg';

const Contact = () => {
  const { sections } = useScrollContext(); // Obtener las referencias del contexto
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const contactLine1Ref = useRef(null);
  const contactLine2Ref = useRef(null);
  const contactLine3Ref = useRef(null);
  const contactLine4Ref = useRef(null);

  useEffect(() => {
    const { gsap } = window; // Accede a GSAP globalmente
    const { ScrollTrigger } = window;

    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger); // Asegura que ScrollTrigger esté registrado

      const contactSection = document.querySelector('.contact-section');

      // Primera línea (derecha a izquierda)
      gsap.fromTo(
        contactLine1Ref.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          transformOrigin: 'right center',
          scrollTrigger: {
            trigger: contactSection,
            start: 'top center+=100',
            end: 'bottom center+=700',
            scrub: true,
          },
        }
      );

      // Segunda línea (izquierda a derecha)
      gsap.fromTo(
        contactLine2Ref.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: contactSection,
            start: 'top center+=300',
            end: 'bottom center+=700',
            scrub: true,
          },
        }
      );

      // Tercera línea (derecha a izquierda)
      gsap.fromTo(
        contactLine3Ref.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          transformOrigin: 'right center',
          scrollTrigger: {
            trigger: contactSection,
            start: 'top center+=200',
            end: 'bottom center+=700',
            scrub: true,
          },
        }
      );

      // Cuarta línea (izquierda a derecha)
      gsap.fromTo(
        contactLine4Ref.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: contactSection,
            start: 'top center+=150',
            end: 'bottom center+=700',
            scrub: true,
          },
        }
      );
    } else {
      console.error('GSAP or ScrollTrigger not found!');
    }
  }, []);

  return (
    <section id="contact" className="contact-section" ref={sections.contact}>
      {/* Contenedor para las líneas */}

      {/* Contenido */}
      <div className="contact-content">
        <h2>
          DISCOVER THE BEST MUSIC IN 7” FORMAT CURATED AND MIXED WITH LOVE <br />
          ☮
        </h2>
        <p>Get in touch for collaborations or bookings.</p>
      </div>
      <div className="contact-container">
        <div className="contact-lines-container">
          <div ref={contactLine1Ref} className="contact-horizontal-line contact-line-1"></div>
          <div ref={contactLine2Ref} className="contact-horizontal-line contact-line-2"></div>
          <div ref={contactLine3Ref} className="contact-horizontal-line contact-line-3"></div>
          <div ref={contactLine4Ref} className="contact-horizontal-line contact-line-4"></div>
        </div>

        <button className="contact-button" onClick={() => setIsPopupOpen(true)}>
          CONTACT
        </button>
      </div>
      <div>
        <h1 className="main-title-black">GROOVE ON 7"</h1>
      </div>
      <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
        <button className="social-media">
          <img src={InstagramIcon} alt="Instagram" />
        </button>
      </a>

      {/* Ventana emergente */}
      <ContactPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
    </section>
  );
};

export default Contact;

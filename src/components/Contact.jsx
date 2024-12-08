/* import React, { useState } from 'react';
import { useScrollContext } from '../context/ScrollContext';

const Contact = () => {
  const { sections } = useScrollContext(); // Obtener las referencias del contexto
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Estado para la ventana emergente

  // Función para abrir la ventana emergente
  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  // Función para cerrar la ventana emergente
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

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
        <button className="contact-button" onClick={handleOpenPopup}>
          CONTACT
        </button>
      </div>
      <div>
        <h1 className="main-title-black">GROOVE ON 7"</h1>
      </div>
      <button className="social-media">
        <img src="img/icons/instagram.svg" alt="Instagram" />
      </button>

      {}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            {}
            <p>This is the contact form or details.</p>
            <button className="close-popup-button" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
 */

import React, { useState } from 'react';
import { useScrollContext } from '../context/ScrollContext';

const Contact = () => {
  const { sections } = useScrollContext();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    eventLocation: '',
    city: '',
    date: '',
    contactPerson: '',
    email: '',
    cell: '',
    musicStyles: [],
    additionalInfo: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const newStyles = checked ? [...prevData.musicStyles, value] : prevData.musicStyles.filter((style) => style !== value);

      return { ...prevData, musicStyles: newStyles };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Aquí podrías integrar con tu backend o API
    alert('Your message has been sent!');
    setIsPopupOpen(false); // Cerrar ventana tras enviar
  };

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
        <button className="contact-button" onClick={() => setIsPopupOpen(true)}>
          CONTACT
        </button>
      </div>
      <div>
        <h1 className="main-title-black">GROOVE ON 7"</h1>
      </div>
      <button className="social-media">
        <img src="img/icons/instagram.svg" alt="Instagram" />
      </button>

      {/* Ventana emergente */}
      {isPopupOpen && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-popup-button" onClick={() => setIsPopupOpen(false)}>
              Close
            </button>
            <form onSubmit={handleSubmit} className="contact-form">
              <h3>Contact Us</h3>
              <label>
                Event Location:
                <input type="text" name="eventLocation" value={formData.eventLocation} onChange={handleInputChange} required />
              </label>
              <label>
                City:
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} required />
              </label>
              <label>
                Date:
                <input type="date" name="date" value={formData.date} onChange={handleInputChange} required />
              </label>
              <label>
                Contact Person:
                <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleInputChange} required />
              </label>
              <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
              </label>
              <label>
                Cell:
                <input type="tel" name="cell" value={formData.cell} onChange={handleInputChange} />
              </label>
              <fieldset>
                <legend>Music Style</legend>
                <label>
                  <input type="checkbox" value="Disco" onChange={handleCheckboxChange} />
                  Disco
                </label>
                <label>
                  <input type="checkbox" value="Funk" onChange={handleCheckboxChange} />
                  Funk
                </label>
                <label>
                  <input type="checkbox" value="House" onChange={handleCheckboxChange} />
                  House
                </label>
                <label>
                  <input type="checkbox" value="Latin" onChange={handleCheckboxChange} />
                  Latin
                </label>
              </fieldset>
              <label>
                Additional Information:
                <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleInputChange} maxLength="250" />
              </label>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;

/* Importa React, hooks e iconos */
import React, { useState, useEffect, useRef } from 'react';
import { useScrollContext } from '../context/ScrollContext';
import LocationIcon from '../assets/icons/location.svg';
import CalendarIcon from '../assets/icons/calendar.svg';

/* Declara referencias para manipular elementos DOM directamente */
const Events = () => {
  const { sections } = useScrollContext();
  const [events, setEvents] = useState([]);

  // Referencias para las líneas verticales
  const verticalLine1Ref = useRef(null);
  const verticalLine2Ref = useRef(null);
  const verticalLine3Ref = useRef(null);

  // URL del backend
  const backendURL = process.env.NODE_ENV === 'development' ? 'http://localhost:5001/events' : 'https://grooveon7-production.up.railway.app/events';

  // Carga eventos desde el servidor
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log('Fetching events from:', backendURL);
        const response = await fetch(backendURL);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setEvents(data); // Almacena los eventos obtenidos en el estado
      } catch (error) {
        console.error('Error al cargar eventos:', error.message);
      }
    };

    fetchEvents();
  }, [backendURL]);

  /* Registra el plugin ScrollTrigger en gsap y definir el área de activación de las animaciones. */
  useEffect(() => {
    const { gsap } = window; // Accede a GSAP globalmente
    const { ScrollTrigger } = window; // Accede a ScrollTrigger desde GSAP

    if (gsap && ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger); // Asegura que ScrollTrigger esté registrado

      const eventsSection = document.querySelector('.events-section');

      // Primera línea (arriba a abajo)
      gsap.fromTo(
        verticalLine1Ref.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: eventsSection,
            start: 'top center+=25',
            end: 'bottom center',
            scrub: true,
          },
        }
      );

      // Segunda línea (abajo a arriba)
      gsap.fromTo(
        verticalLine2Ref.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          transformOrigin: 'bottom center',
          scrollTrigger: {
            trigger: eventsSection,
            start: 'top center+=250',
            end: 'bottom center+=350',
            scrub: true,
          },
        }
      );

      // Tercera línea (arriba a abajo)
      gsap.fromTo(
        verticalLine3Ref.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: eventsSection,
            start: 'top center-=150',
            end: 'bottom center-=150',
            scrub: true,
          },
        }
      );
    } else {
      console.error('GSAP or ScrollTrigger not found!');
    }
  }, []);

  // Formatear fecha en formato dd-mm-yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
  };

  // Formatear hora en formato hh:mm
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  // Función para generar y descargar un archivo .ics
  const handleAddToCalendar = (event) => {
    const eventTitle = event.name;
    const eventDate = new Date(event.date);
    const eventTime = event.time;
    const eventLocation = event.location;

    // Formato de la fecha y hora para .ics
    const startDateTime = `${eventDate.toISOString().replace(/-|:|\.\d+/g, '')}`;
    const endDateTime = `${eventDate.toISOString().replace(/-|:|\.\d+/g, '')}`;

    // Genera contenido para el archivo .ics
    const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${eventTitle}
DTSTART:${startDateTime}
DTEND:${endDateTime}
LOCATION:${eventLocation}
DESCRIPTION:Event created from Groove on 7
END:VEVENT
END:VCALENDAR
    `.trim();

    // Crear el archivo .ics como un blob
    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);

    // Crear un enlace de descarga y activarlo
    const a = document.createElement('a');
    a.href = url;
    a.download = `${eventTitle.replace(/\s+/g, '_')}.ics`; // Nombre del archivo basado en el título del evento
    document.body.appendChild(a);
    a.click();

    // Limpia el DOM y libera memoria
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="events" className="events-section" ref={sections.events}>
      {/* Líneas verticales */}
      <div className="lines-container">
        <div ref={verticalLine1Ref} className="vertical-line line-1"></div>
        <div ref={verticalLine2Ref} className="vertical-line line-2"></div>
        <div ref={verticalLine3Ref} className="vertical-line line-3"></div>
      </div>

      {/* Título de la sección */}
      <div className="events-title">
        <h3>Events</h3>
      </div>

      {/* Contenido de los eventos */}
      <div className="events-content">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="event">
              <p className="event-name">{event.name}</p>
              <p>{formatDate(event.date)}</p>
              <p>{formatTime(event.time)}</p>
              <p>{event.location}</p>
              <div className="icons-container">
                <a href={event.map_link} target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="View on Map">
                  <img src={LocationIcon} alt="View on Map" className="icon" />
                </a>
                <button onClick={() => handleAddToCalendar(event)} className="icon-link" aria-label="Add to Calendar">
                  <img src={CalendarIcon} alt="Add to Calendar" className="icon" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-events">
            <p>Next sessions coming soon...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Events;

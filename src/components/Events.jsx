import React, { useState, useEffect } from 'react';
import { useScrollContext } from '../context/ScrollContext';

const Events = () => {
  const { sections } = useScrollContext(); // Obtener las referencias del contexto
  const [events, setEvents] = useState([]); // Estado para almacenar eventos

  // Determinar la URL del backend
  const backendURL =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:5001/events' // URL del backend local durante desarrollo
      : 'https://grooveon7-production.up.railway.app/events'; // URL del backend en producción

  // Cargar eventos desde el backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(backendURL);
        if (!response.ok) throw new Error('Error al obtener los eventos');
        const data = await response.json();
        setEvents(data); // Actualiza el estado con los eventos del backend
      } catch (error) {
        console.error('Error al cargar eventos:', error);
      }
    };

    fetchEvents();
  }, [backendURL]); // Solo se ejecuta al montar el componente o si cambia la URL del backend

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan en 0
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Función para formatear la hora
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };




  
  // Función para generar el archivo .ics
  const handleAddToCalendar = (event) => {
    const startDate = new Date(event.date).toISOString().replace(/[-:]/g, '').split('.')[0]; // Formato compatible con iCalendar
    const endDate = new Date(new Date(event.date).getTime() + 2 * 60 * 60 * 1000) // Evento de 2 horas
      .toISOString()
      .replace(/[-:]/g, '')
      .split('.')[0];

    const calendarEvent = `
BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:${event.name}
DESCRIPTION:${event.name} - ${event.location}
DTSTART:${startDate}Z
DTEND:${endDate}Z
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

    // Crear un blob y descargarlo
    const blob = new Blob([calendarEvent], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${event.name.replace(/\s+/g, '_')}.ics`; // Nombre del archivo basado en el nombre del evento
    link.click();
  };






  return (
    <section id="events" className="events-section" ref={sections.events}>
      <div className="events-title">
        <h3>Events</h3>
      </div>

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
                  <img
                    src="img/icons/location.svg" // Ruta al icono de ubicación
                    alt="View on Map"
                    className="icon"
                  />
                </a>
                <button onClick={() => handleAddToCalendar(event)} className="icon-link" aria-label="Add to Calendar">
                  <img
                    src="img/icons/calendar.svg" // Ruta al icono del calendario
                    alt="Add to Calendar"
                    className="icon"
                  />
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

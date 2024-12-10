/* import React from 'react';
import { useScrollContext } from '../context/ScrollContext';

const Events = () => {
  const { sections } = useScrollContext(); // Obtener las referencias del contexto

  return (
    <section id="events" className="events-section" ref={sections.events}>
      <div className="events-title">
        <h3>Events</h3>
      </div>
      <div className="events-content">
        <div className="event">
          <p>Date</p>
          <p>Event Name</p>
          <p>Location</p>
          <div className="add-to-calendar-container">
            <button className="add-to-calendar-button">ADD EVENT TO YOUR CALENDAR</button>
          </div>
        </div>
        <div className="event">
          <p>Date</p>
          <p>Event Name</p>
          <p>Location</p>
          <div className="add-to-calendar-container">
            <button className="add-to-calendar-button">ADD EVENT TO YOUR CALENDAR</button>
          </div>
        </div>
        <div className="event">
          <p>Date</p>
          <p>Event Name</p>
          <p>Location</p>
          <div className="add-to-calendar-container">
            <button className="add-to-calendar-button">ADD EVENT TO YOUR CALENDAR</button>
          </div>
        </div>
        <div className="event">
          <p>Date</p>
          <p>Event Name</p>
          <p>Location</p>
          <div className="add-to-calendar-container">
            <button className="add-to-calendar-button">ADD EVENT TO YOUR CALENDAR</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
 */










/* import React, { useState } from 'react';
import { useScrollContext } from '../context/ScrollContext';

const Events = () => {
  const { sections } = useScrollContext(); // Obtener las referencias del contexto
  const [events, setEvents] = useState([]); // Estado para almacenar eventos
  const [isAdmin, setIsAdmin] = useState(true); // Cambiar a `false` para probar como usuario
  const [newEvent, setNewEvent] = useState({ date: '', name: '', location: '' }); // Estado para el nuevo evento

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  // Añadir un evento al estado
  const handleAddEvent = () => {
    if (newEvent.date && newEvent.name && newEvent.location) {
      setEvents([...events, newEvent]); // Agregar el nuevo evento
      setNewEvent({ date: '', name: '', location: '' }); // Limpiar el formulario
    } else {
      alert('Por favor, completa todos los campos antes de añadir un evento.');
    }
  };

  return (
    <section id="events" className="events-section" ref={sections.events}>
      <div className="events-title">
        <h3>Events</h3>
      </div>

      {isAdmin && (
        <div className="admin-panel">
          <h4>Add a New Event</h4>
          <div className="admin-form">
            <input type="date" name="date" value={newEvent.date} onChange={handleInputChange} placeholder="Date" required />
            <input type="text" name="name" value={newEvent.name} onChange={handleInputChange} placeholder="Event Name" required />
            <input type="text" name="location" value={newEvent.location} onChange={handleInputChange} placeholder="Location" required />
            <button onClick={handleAddEvent} className="add-event-button">
              Add Event
            </button>
          </div>
        </div>
      )}

      <div className="events-content">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="event">
              <p>{event.date}</p>
              <p>{event.name}</p>
              <p>{event.location}</p>
              <div className="add-to-calendar-container">
                <button className="add-to-calendar-button">ADD EVENT TO YOUR CALENDAR</button>
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
 */







import React, { useState, useEffect } from 'react';
import { useScrollContext } from '../context/ScrollContext';

const Events = () => {
  const { sections } = useScrollContext(); // Obtener las referencias del contexto
  const [events, setEvents] = useState([]); // Estado para almacenar eventos
  const [isAdmin, setIsAdmin] = useState(true); // Cambiar a `false` para probar como usuario
  const [newEvent, setNewEvent] = useState({ date: '', name: '', location: '' }); // Estado para el nuevo evento

  // Cargar eventos desde el backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5001/events'); // Cambia la URL si tu backend está en producción
        if (!response.ok) throw new Error('Error al obtener los eventos');
        const data = await response.json();
        setEvents(data); // Actualiza el estado con los eventos del backend
      } catch (error) {
        console.error('Error al cargar eventos:', error);
      }
    };

    fetchEvents();
  }, []); // Solo se ejecuta al montar el componente

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  // Añadir un evento al backend y actualizar el estado
  const handleAddEvent = async () => {
    if (newEvent.date && newEvent.name && newEvent.location) {
      try {
        const response = await fetch('http://localhost:5000/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newEvent),
        });
        if (!response.ok) throw new Error('Error al añadir el evento');
        const addedEvent = await response.json();
        setEvents([...events, addedEvent]); // Agregar el nuevo evento al estado
        setNewEvent({ date: '', name: '', location: '' }); // Limpiar el formulario
      } catch (error) {
        console.error('Error al añadir evento:', error);
      }
    } else {
      alert('Por favor, completa todos los campos antes de añadir un evento.');
    }
  };

  return (
    <section id="events" className="events-section" ref={sections.events}>
      <div className="events-title">
        <h3>Events</h3>
      </div>

      {isAdmin && (
        <div className="admin-panel">
          <h4>Add a New Event</h4>
          <div className="admin-form">
            <input type="date" name="date" value={newEvent.date} onChange={handleInputChange} placeholder="Date" required />
            <input type="text" name="name" value={newEvent.name} onChange={handleInputChange} placeholder="Event Name" required />
            <input type="text" name="location" value={newEvent.location} onChange={handleInputChange} placeholder="Location" required />
            <button onClick={handleAddEvent} className="add-event-button">
              Add Event
            </button>
          </div>
        </div>
      )}

      <div className="events-content">
        {events.length > 0 ? (
          events.map((event, index) => (
            <div key={index} className="event">
              <p>{event.date}</p>
              <p>{event.name}</p>
              <p>{event.location}</p>
              <div className="add-to-calendar-container">
                <button className="add-to-calendar-button">ADD EVENT TO YOUR CALENDAR</button>
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

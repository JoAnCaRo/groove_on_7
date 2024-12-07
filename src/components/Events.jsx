import React from 'react';
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

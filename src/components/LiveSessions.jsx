import React from 'react';

const LiveSessions = () => {
  return (
    <section id="live-sessions" className="live-sessions-section">
      <h3>Live Sessions</h3>

      <div className="session">
        <div className="session-image">
          <img src="img/thumbnails/thumbnail1.png" alt="Disco Session" />
        </div>
        <div className="session-content">
          <h4>Disco</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
          <button className="play-button">
            <img src="img/icons/fullscreen.svg" alt="Play" />
          </button>
        </div>
      </div>

      <div className="session">
        <div className="session-image">
          <img src="img/thumbnails/thumbnail2.png" alt="Funk Session" />
        </div>
        <div className="session-content">
          <h4>Funk</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
          <button className="play-button">
            <img src="img/icons/fullscreen.svg" alt="Play" />
          </button>
        </div>
      </div>

      <div className="session">
        <div className="session-image">
          <img src="img/thumbnails/thumbnail3.png" alt="House Session" />
        </div>
        <div className="session-content">
          <h4>House</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipiscing elit.</p>
          <button className="play-button">
            <img src="img/icons/fullscreen.svg" alt="Play" />
          </button>
        </div>
      </div>

      <div className="see-all-container">
        <button className="see-all-button-live">SEE ALL</button>
      </div>
    </section>
  );
};

export default LiveSessions;

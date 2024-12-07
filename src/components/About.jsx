import React from 'react';
import { useScrollContext } from '../context/ScrollContext';

const About = () => {
  const { sections } = useScrollContext();

  return (
    <section ref={sections.about}  id="about" className="about-section">
      <h2>THIS ABOUT MUSIC, VINYL CULTURE AND LOVE</h2>
      <p>Welcome to Groove on 7!</p>
      <p>For over 15 years, I’ve been on a global journey, curating an extraordinary collection of 7” vinyl singles, each record carrying its own story, rhythm, and soul.</p>
      <p>From dusty crates in far-flung record shops to spinning at some of Berlin's most iconic bars, I’ve shared these grooves with those who know the power of music to connect and inspire.</p>
      <p>Now, it’s time to take this passion beyond the dancefloor and into your world.</p>
      <p>Groove on 7 is more than just a portfolio, it’s a space where vinyl culture, timeless sounds, and unforgettable vibes come together.</p>
    </section>
  );
};

export default About;

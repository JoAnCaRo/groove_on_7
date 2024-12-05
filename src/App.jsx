import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import LiveSessions from './components/LiveSessions';
import Playlists from './components/Playlists';
import CreatePlaylist from './components/CreatePlaylist';
import Events from './components/Events';
import Contact from './components/Contact';
import Footer from './components/Footer';

import './styles/globals.css';
import './styles/navbar.css';
import './styles/hero.css';
import './styles/about.css';
import './styles/contact.css';
import './styles/createlist.css';
import './styles/events.css';
import './styles/footer.css';
import './styles/live-sessions.css';
import './styles/playlists.css';


const App = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <LiveSessions />
      <Playlists />
      <CreatePlaylist />
      <Events />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;

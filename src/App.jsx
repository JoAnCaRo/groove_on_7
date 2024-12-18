import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importar router
import Navbar from './components/Navbar';
import HeaderTitle from './components/HeaderTitle';
import Hero from './components/Hero';
import About from './components/About';
import LiveSessions from './components/LiveSessions';
import Playlists from './components/Playlists';
import CreatePlaylist from './components/CreatePlaylist';
import Events from './components/Events';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Callback from './components/Callback'; // Importar el componente Callback
import { ScrollProvider } from './context/ScrollContext';

/* import './styles/globals.css'; */
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
    <ScrollProvider>
      <Router basename="/groove_on_7">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <div className="app-container">
                <HeaderTitle />
                <Hero />
                <About />
                <LiveSessions />
                <Playlists />
                <CreatePlaylist />
                <Events />
                <Contact />
                <Footer />
              </div>
            }
          />
          <Route path="/callback" element={<Callback />} />
        </Routes>
      </Router>
    </ScrollProvider>
  );
};

export default App;

import React, { useEffect, useRef, useState } from 'react';
import PlaylistPopup from './PlaylistPopup';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CreatePlaylist = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const verticalLineLeftRef = useRef(null);
  const horizontalLineRightRef = useRef(null);

  const handleSpotifyLogin = () => {
    const clientId = 'a1a40ff261a74446b82d30c304c3717b'; // Reemplaza con tu Client ID de Spotify
    const redirectUri = 'https://00f1-77-183-190-220.ngrok-free.app/callback'; // Asegúrate de que coincida con el configurado en Spotify
    const scope = 'playlist-read-private'; // Acceso a playlists privadas

    // URL para iniciar sesión con Spotify
    const spotifyAuthUrl = new URL('https://accounts.spotify.com/authorize');
    spotifyAuthUrl.searchParams.append('response_type', 'token');
    spotifyAuthUrl.searchParams.append('client_id', clientId);
    spotifyAuthUrl.searchParams.append('redirect_uri', redirectUri);
    spotifyAuthUrl.searchParams.append('scope', scope);

    // Redirigir al usuario al proceso de autenticación de Spotify
    window.location.href = spotifyAuthUrl.toString();
  };

  useEffect(() => {
    const createPlaylistSection = document.querySelector('.create-playlist-section');

    if (verticalLineLeftRef.current && horizontalLineRightRef.current) {
      // Animación para la línea izquierda (de arriba a abajo)
      gsap.fromTo(
        verticalLineLeftRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 2,
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: createPlaylistSection,
            start: 'top center',
            end: 'bottom center',
            scrub: true,
          },
        }
      );

      // Animación para la línea derecha (horizontal de derecha a izquierda)
      gsap.fromTo(
        horizontalLineRightRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 2,
          transformOrigin: 'right center',
          scrollTrigger: {
            trigger: createPlaylistSection,
            start: 'top center-=200',
            end: 'bottom center-=400',
            scrub: true,
          },
        }
      );
    }
  }, []);

  return (
    <section id="create-playlist" className="create-playlist-section">
      {/* Contenedores de las líneas */}
      <div className="line-container">
        <div ref={verticalLineLeftRef} className="vertical-line-left"></div>
        <div ref={horizontalLineRightRef} className="horizontal-line-right"></div>
      </div>

      {/* Contenido de la sección */}
      <div className="create-playlist-content">
        <h3>Create Your Own Playlist</h3>
        <p>Access my playlists and create your own with the best tracks on Tidal.</p>
      </div>

      <div className="create-playlist-container">
        <button className="create-playlist-button" onClick={() => setIsPopupOpen(true)}>
          CREATE YOUR PLAYLIST
        </button>
      </div>

      {/* Ventana emergente */}
      <PlaylistPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} onLogin={handleTidalLogin} />
    </section>
  );
};

export default CreatePlaylist;
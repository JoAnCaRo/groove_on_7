import React, { useEffect, useRef, useState } from 'react';
import PlaylistPopup from './PlaylistPopup';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CreatePlaylist = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [playlistData, setPlaylistData] = useState(null);

  const verticalLineLeftRef = useRef(null);
  const horizontalLineRightRef = useRef(null);

  // Spotify Login Handler
  const handleSpotifyLogin = () => {
    const clientId = 'a1a40ff261a74446b82d30c304c3717b';
    const redirectUri = 'https://joancaro.github.io/groove_on_7/';

    const scope = 'playlist-read-private';

    const spotifyAuthUrl = new URL('https://accounts.spotify.com/authorize');
    spotifyAuthUrl.searchParams.append('response_type', 'token');
    spotifyAuthUrl.searchParams.append('client_id', clientId);
    spotifyAuthUrl.searchParams.append('redirect_uri', redirectUri);
    spotifyAuthUrl.searchParams.append('scope', scope);

    window.location.href = spotifyAuthUrl.toString();
  };

  useEffect(() => {
    const cleanUpToken = () => {
      // Captura el access_token de la URL
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const token = params.get('access_token');
        if (token) {
          setAccessToken(token);
          console.log('Access Token:', token);

          // Limpia el hash de la URL sin recargar la página
          window.history.replaceState(null, document.title, window.location.pathname);
        }
      }
    };

    cleanUpToken();
  }, []);

  // Fetch Playlist Data
  const fetchPlaylist = async () => {
    if (!accessToken) return; // Evita la llamada si no hay token

    const playlistId = '06TIJECvdE85VqhbMbp1OR?si=YDwHNTHwTgSnXhzR5kB_9g'; // Mi Playlist ID
    const url = `https://api.spotify.com/v1/playlists/${playlistId}`;

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setPlaylistData(data);
      console.log('Playlist Data:', data); // Comentario: Playlist data obtenido correctamente
    } catch (error) {
      console.error('Error fetching playlist:', error.message); // Comentario: Manejo de error en fetch
    }
  };

  // Fetch playlist cuando se obtenga el token
  useEffect(() => {
    if (accessToken) {
      fetchPlaylist(); // Comentario: Llama a fetchPlaylist cuando hay token
    }
  }, [accessToken]);

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
        <p>Access my Spotify playlists and create your own with the best tracks.</p>
      </div>

      <div className="create-playlist-container">
        <button className="create-playlist-button" onClick={() => setIsPopupOpen(true)}>
          CREATE YOUR PLAYLIST
        </button>
      </div>

      {/* Mostrar Playlist Data */}
      {playlistData && (
        <div className="playlist-data">
          <h4>{playlistData.name}</h4>
          <ul>
            {playlistData.tracks.items.map((item, index) => (
              <li key={index}>
                {item.track.name} - {item.track.artists[0].name}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Ventana emergente */}
      <PlaylistPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} onLogin={handleSpotifyLogin} />
    </section>
  );
};

export default CreatePlaylist;

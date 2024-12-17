import React, { useEffect, useRef, useState } from 'react';
import PlaylistPopup from './PlaylistPopup';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CreatePlaylist = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [playlistData, setPlaylistData] = useState(null);
  const [embedPlaylistId, setEmbedPlaylistId] = useState(null);

  const verticalLineLeftRef = useRef(null);
  const horizontalLineRightRef = useRef(null);

  // Spotify Login Handler
const handleSpotifyLogin = () => {
  // Guarda la posición actual del scroll
  const scrollPosition = window.scrollY;
  localStorage.setItem('scrollPosition', scrollPosition);

  const clientId = 'a1a40ff261a74446b82d30c304c3717b';
  const redirectUri = 'https://joancaro.github.io/groove_on_7/';

  const scope = 'playlist-read-private playlist-modify-private user-top-read';

  const spotifyAuthUrl = new URL('https://accounts.spotify.com/authorize');
  spotifyAuthUrl.searchParams.append('response_type', 'token');
  spotifyAuthUrl.searchParams.append('client_id', clientId);
  spotifyAuthUrl.searchParams.append('redirect_uri', redirectUri);
  spotifyAuthUrl.searchParams.append('scope', scope);

  // Redirige a Spotify
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

        // Abre la ventana emergente automáticamente
        setIsPopupOpen(true);

        // Limpia el hash de la URL sin recargar la página
        window.history.replaceState(null, document.title, window.location.pathname);

        // Restaura la posición del scroll
        const savedScrollPosition = localStorage.getItem('scrollPosition');
        if (savedScrollPosition) {
          window.scrollTo(0, parseInt(savedScrollPosition, 10));
          localStorage.removeItem('scrollPosition'); // Limpia el localStorage
        }
      }
    }
  };

  cleanUpToken();
}, []);


  // Fetch Top Tracks and Create Playlist
  const fetchTopTracks = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      const tracksUri = data.items.map((track) => track.uri);
      return { tracksUri, tracks: data.items };
    } catch (error) {
      console.error('Error fetching top tracks:', error);
    }
  };

  const createPlaylistWithTopTracks = async (tracksUri) => {
    try {
      const userResponse = await fetch('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const userData = await userResponse.json();
      const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userData.id}/playlists`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'My Top 10 Tracks Playlist',
          description: 'Playlist created from your top 10 tracks!',
          public: false,
        }),
      });
      const playlist = await playlistResponse.json();
      await fetch(`https://api.spotify.com/v1/playlists/${playlist.id}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uris: tracksUri }),
      });
      setEmbedPlaylistId(playlist.id);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  const handleGeneratePlaylist = async () => {
    if (!accessToken) return;
    const { tracksUri } = await fetchTopTracks();
    if (tracksUri) {
      await createPlaylistWithTopTracks(tracksUri);
    }
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
        <h3>Check My Top-Ten Tracks</h3>
        <p>Generate your personalized Spotify playlist based on your top 10 tracks!</p>
      </div>

      <div className="create-playlist-container">
        {/* Botón de login para Spotify */}
        <button className="login-spotify-button" onClick={handleSpotifyLogin}>
          Login with Spotify
        </button>
      </div>

      {/* Ventana emergente */}
      <PlaylistPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <button className="create-playlist-button" onClick={handleGeneratePlaylist}>
          Generate My Top 10 Tracks Playlist
        </button>
        {embedPlaylistId && (
          <iframe
            title="Spotify Playlist Embed"
            src={`https://open.spotify.com/embed/playlist/${embedPlaylistId}`}
            width="100%"
            height="380"
            style={{ marginTop: '20px', border: 'none' }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        )}
      </PlaylistPopup>
    </section>
  );
};

export default CreatePlaylist;

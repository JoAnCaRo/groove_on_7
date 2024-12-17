import React, { useEffect, useRef, useState } from 'react';
import PlaylistPopup from './PlaylistPopup';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CreatePlaylist = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [accessToken, setAccessToken] = useState('');
  const [embedPlaylistUrl, setEmbedPlaylistUrl] = useState(null); // URL para el embed dinámico

  const verticalLineLeftRef = useRef(null);
  const horizontalLineRightRef = useRef(null);

  // Spotify Login Handler
  const handleSpotifyLogin = () => {
    const scrollPosition = window.scrollY;
    localStorage.setItem('scrollPosition', scrollPosition);

    const clientId = 'a1a40ff261a74446b82d30c304c3717b';
    const redirectUri = 'https://joancaro.github.io/groove_on_7/';

    const scope = 'playlist-read-private user-top-read';

    const spotifyAuthUrl = new URL('https://accounts.spotify.com/authorize');
    spotifyAuthUrl.searchParams.append('response_type', 'token');
    spotifyAuthUrl.searchParams.append('client_id', clientId);
    spotifyAuthUrl.searchParams.append('redirect_uri', redirectUri);
    spotifyAuthUrl.searchParams.append('scope', scope);
    spotifyAuthUrl.searchParams.append('show_dialog', 'true'); // Forzar login

    window.location.href = spotifyAuthUrl.toString();
  };

  useEffect(() => {
    const cleanUpToken = () => {
      const hash = window.location.hash;
      if (hash) {
        const params = new URLSearchParams(hash.substring(1));
        const token = params.get('access_token');
        if (token) {
          setAccessToken(token);
          setIsPopupOpen(true);
          window.history.replaceState(null, document.title, window.location.pathname);

          const savedScrollPosition = localStorage.getItem('scrollPosition');
          if (savedScrollPosition) {
            window.scrollTo(0, parseInt(savedScrollPosition, 10));
            localStorage.removeItem('scrollPosition');
          }
        }
      }
    };

    cleanUpToken();
  }, []);

  // Fetch Top Tracks to generate a dynamic embed playlist URL
  const fetchTopTracks = async () => {
    try {
      const response = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=10', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      const tracksUri = data.items.map((track) => track.uri);
      return tracksUri;
    } catch (error) {
      console.error('Error fetching top tracks:', error);
    }
  };

  const handleGeneratePlaylist = async () => {
    if (!accessToken) return;
    const tracksUri = await fetchTopTracks();

    if (tracksUri && tracksUri.length > 0) {
      // Generate a Spotify Embed URL using track URIs
      const trackIds = tracksUri.map((uri) => uri.split(':')[2]).join(',');
      const embedUrl = `https://open.spotify.com/embed?uri=spotify:trackset:Top 10 Tracks:${trackIds}`;
      setEmbedPlaylistUrl(embedUrl);
    }
  };

  useEffect(() => {
    const createPlaylistSection = document.querySelector('.generate-playlist-section');

    if (verticalLineLeftRef.current && horizontalLineRightRef.current) {
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
    <section id="generate-playlist" className="generate-playlist-section">
      <div className="line-container">
        <div ref={verticalLineLeftRef} className="vertical-line-left"></div>
        <div ref={horizontalLineRightRef} className="horizontal-line-right"></div>
      </div>

      <div className="generate-playlist-content">
        <h3>Check My Top-Ten Tracks</h3>
        <p>Check, play or save my top-10 tracks in your Spotify account!</p>
      </div>

      <div className="generate-playlist-container">
        <button className="login-spotify-button" onClick={handleSpotifyLogin}>
          LOGIN WITH SPOTIFY
        </button>
      </div>

      {/* Ventana emergente */}
      <PlaylistPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <button className="generate-playlist-button" onClick={handleGeneratePlaylist}>
          Generate My Top 10 Tracks Playlist
        </button>
        {embedPlaylistUrl && (
          <iframe
            title="Spotify Playlist Embed"
            src={embedPlaylistUrl}
            width="100%"
            height="510"
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

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el fragmento de la URL (#access_token=...)
    const hash = window.location.hash;
    if (hash) {
      const params = new URLSearchParams(hash.substring(1)); // Quitar el "#"
      const accessToken = params.get('access_token');
      const error = params.get('error');

      if (accessToken) {
        console.log('Access Token:', accessToken);

        // Guardar el token en el almacenamiento local para su uso posterior
        localStorage.setItem('tidalAccessToken', accessToken);

        // Redirigir al usuario a la página principal o donde necesite estar
        navigate('/');
      } else if (error) {
        console.error('Error al autenticar:', error);

        // Manejar errores, podrías redirigir al usuario o mostrar un mensaje
        alert('Error al autenticar con Tidal. Por favor, inténtalo de nuevo.');
        navigate('/');
      }
    }
  }, [navigate]);

  return (
    <div>
      <h1>Autenticando...</h1>
      <p>Por favor, espera mientras procesamos tu autenticación con Tidal.</p>
    </div>
  );
};

export default Callback;

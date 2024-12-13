import React, { useEffect } from 'react';

const Callback = () => {
  useEffect(() => {
    console.log('URL completa:', window.location.href);
    console.log('Parámetros de hash:', window.location.hash);

    // Procesa los parámetros de hash correctamente
    const params = new URLSearchParams(window.location.hash.substring(1));
    const authorizationCode = params.get('code');
    if (authorizationCode.includes('&')) {
      authorizationCode = authorizationCode.split('&')[0]; // Elimina cualquier carácter extra
    }

    if (authorizationCode) {
      console.log('Authorization Code:', authorizationCode);
      exchangeAuthorizationCode(authorizationCode); // Intercambiar por el token
    } else if (error) {
      console.error('Error en la autenticación:', error);
      alert('Error al autenticar con TIDAL.');
    } else {
      console.error('No se encontró un código de autorización ni un error en los parámetros.');
    }
  }, []);

  const exchangeAuthorizationCode = async (authorizationCode) => {
    const clientId = 'FsvXoX8IZ52EWmOV';
    const clientSecret = 'gjqOIsYcrEaOxKHK6NSkK8aLpid4JrNphF3VyUl59IM=';
    const redirectUri = 'https://00f1-77-183-190-220.ngrok-free.app/callback';

    const body = new URLSearchParams();
    body.append('grant_type', 'authorization_code');
    body.append('code', authorizationCode);
    body.append('redirect_uri', redirectUri);
    body.append('client_id', clientId);
    body.append('client_secret', clientSecret);

    console.log('Cuerpo de la solicitud:', body.toString());

    try {
      const response = await fetch('https://auth.tidal.com/v1/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error completo del servidor:', errorResponse);
        throw new Error(errorResponse.error_description || response.statusText);
      }

      const data = await response.json();
      console.log('Access Token:', data.access_token);
      localStorage.setItem('tidalAccessToken', data.access_token);
    } catch (error) {
      console.error('Error al intercambiar el código:', error);
    }
  };

  return (
    <div>
      <h1>Procesando autenticación...</h1>
    </div>
  );
};

export default Callback;

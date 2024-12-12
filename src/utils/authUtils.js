// authUtils.js
export const generateRandomString = (length) => {
  const array = new Uint32Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ('0' + (dec % 36).toString(36)).slice(-1)).join('');
};

export const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest('SHA-256', data);
};

export const base64urlencode = (arrayBuffer) => {
  return btoa(String.fromCharCode.apply(null, new Uint8Array(arrayBuffer)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

export const generatePKCE = async () => {
  const codeVerifier = generateRandomString(128);
  const hashed = await sha256(codeVerifier);
  const codeChallenge = base64urlencode(hashed);
  return { codeVerifier, codeChallenge };
};

// fetchEvents con modo no-cors
export const fetchEvents = async () => {
  try {
    const response = await fetch('http://localhost:5001/events', {
      method: 'GET',
      mode: 'no-cors', // Agregado para evitar problemas de CORS
    });

    // Intento de parsear la respuesta (puede estar restringido con no-cors)
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error al cargar eventos:', error);
  }
};
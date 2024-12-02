/* SCROLL SUAVE PARA IR A SECCIONES DEL MENÚ */
export const smoothScroll = () => {
  try {
    document.querySelectorAll('.navbar a').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          const startPosition = window.scrollY;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          const duration = 2000; // Duración de la animación en milisegundos
          let startTime = null;

          const easeInOutQuad = (t, b, c, d) => {
            t /= d / 2;
            if (t < 1) return (c / 2) * t * t + b;
            t--;
            return (-c / 2) * (t * (t - 2) - 1) + b;
          };

          const animation = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = easeInOutQuad(timeElapsed, startPosition, targetPosition - startPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
          };

          requestAnimationFrame(animation);
        } else {
          console.warn(`Elemento con ID '${targetId}' no encontrado`);
        }
      });
    });
  } catch (error) {
    console.error('Error en smoothScroll:', error);
  }
};

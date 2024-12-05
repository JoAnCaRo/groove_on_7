// Importaciones al inicio
import { gsap } from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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

/* ANIMACIÓN LINEAS */
export const animateLines = () => {
  const linesContainer = document.querySelector('.lines-container');
  const createLines = (count) => {
    for (let i = 0; i < count; i++) {
      const line = document.createElement('div');
      line.classList.add('line');
      linesContainer.appendChild(line);
    }
  };

  createLines(10); // Cambia la cantidad según lo que necesites
  const lines = document.querySelectorAll('.line');

  lines.forEach((line) => {
    const startX = Math.random() * window.innerWidth;
    const direction = Math.random() > 0.5 ? 1 : -1;

    gsap.fromTo(
      line,
      {
        x: startX,
        y: -100,
        opacity: 0,
      },
      {
        x: startX + direction * 200,
        y: '100%',
        opacity: 1,
        duration: 4 + Math.random() * 3,
        ease: 'power2.inOut',
        repeat: -1,
        scrollTrigger: {
          trigger: '#about',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );
  });
};

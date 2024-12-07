const gsap = window.gsap;
const ScrollTrigger = window.ScrollTrigger;

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

/* export const animateLines = () => {
  const linesContainer = document.querySelector('.lines-container');

  if (!linesContainer) {
    console.error('No se encontró el contenedor .lines-container en el DOM.');
    return;
  }

  // Crear la línea roja
  const line = document.createElement('div');
  line.classList.add('line');
  linesContainer.appendChild(line);

  // Configuración inicial para GSAP
gsap.set(line, {
  x: '0%', // Comienza visible en el borde izquierdo
  y: '50%', // En la mitad vertical del contenedor
  width: '0%', // Comienza sin ancho
  height: '3px', // Grosor de la línea
  backgroundColor: 'red', // Color rojo
  opacity: 1, // Completamente visible
  position: 'absolute',
});


  // ScrollTrigger para vincular el movimiento de la línea al scroll
  ScrollTrigger.create({
    trigger: '#about', // Se activa en la sección about
    start: 'top center', // Cuando la sección about llega al centro del viewport
    end: 'bottom center', // Hasta que la sección about salga del centro
    scrub: true, // Vincula la velocidad al scroll
    onUpdate: (self) => {
      // Calcula el progreso del scroll y ajusta el ancho de la línea
      const progress = self.progress * 100; // Progreso en porcentaje
      gsap.to(line, {
        width: `${progress}%`, // Expande la línea en proporción al progreso
        ease: 'none', // Sin animación suave
      });
    },
  });
};
 */

import Lenis from 'lenis';

declare global {
  interface Window {
    /** Instancia de scroll suave (la usa el menú móvil para pausarlo). */
    __lumacodeScroll?: Lenis;
  }
}

// Scroll suave con inercia: la rueda mueve un objetivo y la página lo alcanza poco a poco,
// de modo que al dejar de mover la rueda sigue deslizando y frena despacio.
// Con prefers-reduced-motion se deja el scroll nativo. En pantallas táctiles el scroll sigue siendo el nativo.
if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.__lumacodeScroll = new Lenis({
    autoRaf: true,
    lerp: 0.075,
    wheelMultiplier: 0.9,
    smoothWheel: true,
    anchors: true, // respeta scroll-padding-top
  });
}

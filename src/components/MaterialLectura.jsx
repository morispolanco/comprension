// ... (mantener el código anterior del MaterialLectura.jsx)

// Modificar la parte donde se completa una lectura:
const handleRespuesta = (index) => {
  // ... (código anterior)

  if (preguntaActual === preguntasActuales.length - 1 && 
      seccionActual === 'pensamiento_critico') {
    setLecturaCompletada(true);
    useStore.getState().completarMaterial(lecturaActual);
  }
};

// Modificar la parte donde se cambia a nueva lectura:
const intentarNuevaLectura = () => {
  const nuevaLectura = (lecturaActual + 1) % materialesNivel.length;
  setLecturaActual(nuevaLectura);
  setPreguntaActual(0);
  setRespuestas([]);
  setMostrarFeedback(false);
  setLecturaCompletada(false);
  setSeccionActual('comprension');
};

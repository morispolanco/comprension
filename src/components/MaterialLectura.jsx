import { useState } from 'react';
import useStore from '../store';

const materiales = {
  principiante: [
    {
      titulo: "El Viaje a Casa",
      contenido: `María caminaba lentamente por la calle vacía, observando cómo las hojas otoñales danzaban con el viento. El cielo estaba teñido de naranja y púrpura mientras el sol se ponía en el horizonte. Había sido un largo día en la escuela, y aunque estaba cansada, disfrutaba de este momento tranquilo.

De repente, un pequeño gato negro apareció frente a ella. El felino la miró con curiosidad, maulló suavemente y comenzó a seguirla. María se detuvo y se agachó para acariciarlo. El gato ronroneó contento, y ella notó que no tenía collar. Después de pensarlo un momento, decidió llevarlo consigo. "Te llamaré Luna", susurró mientras lo levantaba con cuidado.

Cuando finalmente llegó a casa, su madre se sorprendió al verla con el gato, pero al escuchar la historia, sonrió comprensivamente. Esa noche, Luna encontró un nuevo hogar, y María descubrió que a veces los mejores encuentros suceden cuando menos los esperamos.`,
      preguntas: [
        {
          pregunta: "¿En qué momento del día transcurre la historia?",
          opciones: ["Al amanecer", "Al atardecer", "Al mediodía", "En la noche"],
          correcta: 1,
          explicacion: "La historia transcurre al atardecer, como se evidencia en la descripción del cielo 'teñido de naranja y púrpura mientras el sol se ponía en el horizonte'."
        },
        {
          pregunta: "¿Qué encontró María en su camino?",
          opciones: ["Un perro", "Un gato negro", "Un pájaro", "Una ardilla"],
          correcta: 1,
          explicacion: "María encontró un gato negro que apareció frente a ella y comenzó a seguirla."
        },
        {
          pregunta: "¿Cómo reaccionó la madre de María?",
          opciones: [
            "Con enojo",
            "Con sorpresa y comprensión",
            "Con indiferencia",
            "Con miedo"
          ],
          correcta: 1,
          explicacion: "La madre de María reaccionó inicialmente con sorpresa, pero después de escuchar la historia, mostró comprensión hacia la situación."
        }
      ]
    }
  ],
  intermedio: [
    {
      titulo: "El Método Científico",
      contenido: `El método científico es una forma sistemática y rigurosa de investigar fenómenos naturales y sociales. Este proceso, desarrollado a lo largo de siglos de investigación, permite a los científicos obtener conocimientos confiables y verificables sobre el mundo que nos rodea.

El proceso comienza con la observación de un fenómeno que despierta nuestra curiosidad. Por ejemplo, un científico podría notar que las plantas crecen de manera diferente bajo distintos tipos de luz. A partir de esta observación, se formula una pregunta específica: "¿Cómo afecta el color de la luz al crecimiento de las plantas?"

El siguiente paso es desarrollar una hipótesis, que es una posible explicación o respuesta a nuestra pregunta. En este caso, podríamos proponer que "las plantas crecen mejor bajo luz azul que bajo luz roja". Esta hipótesis debe ser comprobable mediante experimentos.

La experimentación es crucial en el método científico. Se diseña un experimento controlado donde todas las variables, excepto la que queremos estudiar, se mantienen constantes. Los resultados del experimento nos permitirán confirmar o refutar nuestra hipótesis inicial.

Finalmente, los científicos analizan los datos obtenidos y sacan conclusiones. Si los resultados apoyan la hipótesis, esta puede convertirse en una teoría. Si no, se formula una nueva hipótesis y se repite el proceso. Este ciclo continuo de preguntas, hipótesis y experimentación es lo que impulsa el avance del conocimiento científico.`,
      preguntas: [
        {
          pregunta: "¿Cuál es el primer paso del método científico según el texto?",
          opciones: [
            "Formular una hipótesis",
            "Realizar un experimento",
            "La observación",
            "Analizar datos"
          ],
          correcta: 2,
          explicacion: "Según el texto, el método científico comienza con la observación de un fenómeno que despierta nuestra curiosidad."
        },
        {
          pregunta: "¿Qué es una hipótesis?",
          opciones: [
            "Un resultado experimental",
            "Una posible explicación o respuesta",
            "Una conclusión final",
            "Un método de observación"
          ],
          correcta: 1,
          explicacion: "Una hipótesis es una posible explicación o respuesta a la pregunta de investigación, como se menciona en el texto cuando dice 'desarrollar una hipótesis, que es una posible explicación o respuesta a nuestra pregunta'."
        },
        {
          pregunta: "¿Qué sucede si los resultados no apoyan la hipótesis?",
          opciones: [
            "Se formula una nueva hipótesis",
            "Se termina la investigación",
            "Se ignoran los resultados",
            "Se publica inmediatamente"
          ],
          correcta: 0,
          explicacion: "El texto indica que si los resultados no apoyan la hipótesis, se formula una nueva hipótesis y se repite el proceso."
        }
      ]
    }
  ]
};

export default function MaterialLectura() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respuestas, setRespuestas] = useState([]);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [lecturaCompletada, setLecturaCompletada] = useState(false);
  const nivelLectura = useStore((state) => state.nivelLectura);
  const actualizarProgreso = useStore((state) => state.actualizarProgreso);

  const preguntasActuales = materiales[nivelLectura][0].preguntas;
  const preguntaActualData = preguntasActuales[preguntaActual];

  const handleRespuesta = (index) => {
    const esCorrecta = preguntaActualData.correcta === index;
    const nuevasRespuestas = [...respuestas, { 
      pregunta: preguntaActualData.pregunta,
      respuestaUsuario: preguntaActualData.opciones[index],
      correcta: esCorrecta,
      explicacion: preguntaActualData.explicacion
    }];
    
    setRespuestas(nuevasRespuestas);
    setMostrarFeedback(true);

    if (esCorrecta) {
      actualizarProgreso({ 
        comprension: Math.min(100, Math.random() * 20 + 80) 
      });
    }

    setTimeout(() => {
      setMostrarFeedback(false);
      if (preguntaActual < preguntasActuales.length - 1) {
        setPreguntaActual(preguntaActual + 1);
      } else {
        setLecturaCompletada(true);
      }
    }, 2000);
  };

  const calcularPuntuacion = () => {
    const correctas = respuestas.filter(r => r.correcta).length;
    return Math.round((correctas / preguntasActuales.length) * 100);
  };

  if (lecturaCompletada) {
    const puntuacion = calcularPuntuacion();
    return (
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-bold mb-6">¡Lectura Completada!</h2>
          
          <div className="mb-6">
            <div className="text-xl mb-4">
              Tu puntuación: <span className="font-bold text-blue-600">{puntuacion}%</span>
            </div>
            <div className={`text-lg ${puntuacion >= 70 ? 'text-green-600' : 'text-yellow-600'}`}>
              {puntuacion >= 70 
                ? '¡Excelente trabajo! Has demostrado una buena comprensión del texto.'
                : 'Buen intento. Te sugerimos releer el texto y volver a intentarlo.'}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-bold">Repaso de respuestas:</h3>
            {respuestas.map((respuesta, index) => (
              <div key={index} className={`p-4 rounded-lg ${
                respuesta.correcta ? 'bg-green-50' : 'bg-red-50'
              }`}>
                <p className="font-bold mb-2">{respuesta.pregunta}</p>
                <p className="mb-2">Tu respuesta: {respuesta.respuestaUsuario}</p>
                <p className="text-sm">{respuesta.explicacion}</p>
              </div>
            ))}
          </div>

          <button 
            onClick={() => window.location.reload()}
            className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Intentar otra lectura
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg shadow p-6 mb-4">
        <h2 className="text-2xl font-bold mb-4">
          {materiales[nivelLectura][0].titulo}
        </h2>
        <div className="prose max-w-none mb-6">
          {materiales[nivelLectura][0].contenido.split('\n\n').map((parrafo, i) => (
            <p key={i} className="mb-4">{parrafo}</p>
          ))}
        </div>
        
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="font-bold text-xl mb-4">
            Pregunta {preguntaActual + 1} de {preguntasActuales.length}:
          </h3>
          <p className="mb-4 text-lg">
            {preguntaActualData.pregunta}
          </p>
          <div className="space-y-3">
            {preguntaActualData.opciones.map((opcion, i) => (
              <button
                key={i}
                onClick={() => handleRespuesta(i)}
                className="w-full text-left p-3 rounded border hover:bg-blue-100 transition-colors duration-200"
                disabled={mostrarFeedback}
              >
                {opcion}
              </button>
            ))}
          </div>
          
          {mostrarFeedback && (
            <div className={`mt-4 p-4 rounded ${
              respuestas[respuestas.length - 1].correcta 
                ? 'bg-green-100 text-green-700'
                : 'bg-red-100 text-red-700'
            }`}>
              <p className="font-bold">
                {respuestas[respuestas.length - 1].correcta 
                  ? '¡Correcto!' 
                  : 'Incorrecto'}
              </p>
              <p>{preguntaActualData.explicacion}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

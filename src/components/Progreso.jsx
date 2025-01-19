import useStore from '../store';

export default function Progreso() {
  const progreso = useStore((state) => state.progreso);
  const lecturaActual = useStore((state) => state.lecturaActual);
  const materialesCompletados = useStore((state) => state.materialesCompletados);

  const calcularProgresoTotal = () => {
    const valores = Object.values(progreso);
    return valores.length ? Math.round(valores.reduce((a, b) => a + b) / valores.length) : 0;
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-4">
      <h2 className="text-2xl font-bold mb-6">Tu Progreso</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="text-lg font-semibold mb-2">Progreso por Habilidad</div>
          {Object.entries(progreso).map(([habilidad, valor]) => (
            <div key={habilidad} className="space-y-2">
              <div className="flex justify-between">
                <span className="capitalize">{habilidad.replace('_', ' ')}</span>
                <span className="font-medium">{valor}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${valor}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div>
            <div className="text-lg font-semibold mb-4">Progreso General</div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                    Avance Total
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-blue-600">
                    {calcularProgresoTotal()}%
                  </span>
                </div>
              </div>
              <div className="flex h-2 mb-4 overflow-hidden rounded-full bg-gray-200">
                <div
                  className="flex flex-col justify-center overflow-hidden bg-blue-500 transition-all duration-500"
                  style={{ width: `${calcularProgresoTotal()}%` }}
                ></div>
              </div>
            </div>
          </div>

          <div>
            <div className="text-lg font-semibold mb-4">Estadísticas</div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm text-blue-600">Lecturas Completadas</div>
                <div className="text-2xl font-bold">{materialesCompletados.length}</div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-sm text-green-600">Lectura Actual</div>
                <div className="text-2xl font-bold">{lecturaActual + 1}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { create } from 'zustand';

const useStore = create((set) => ({
  mensajes: [],
  nivelLectura: 'intermedio',
  progreso: {
    comprension: 0,
    vocabulario: 0,
    pensamiento_critico: 0
  },
  agregarMensaje: (mensaje) => 
    set((state) => ({ 
      mensajes: [...state.mensajes, mensaje] 
    })),
  actualizarProgreso: (nuevoProgreso) =>
    set((state) => ({
      progreso: { ...state.progreso, ...nuevoProgreso }
    })),
  setNivelLectura: (nivel) =>
    set({ nivelLectura: nivel })
}));

export default useStore;

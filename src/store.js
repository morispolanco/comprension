import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { materiales } from './data/lecturas';

const useStore = create(
  persist(
    (set) => ({
      mensajes: [],
      nivelLectura: 'principiante',
      lecturaActual: 0,
      materialesCompletados: [],
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
          progreso: { 
            ...state.progreso, 
            ...nuevoProgreso 
          }
        })),
      completarMaterial: (indice) =>
        set((state) => ({
          materialesCompletados: [...state.materialesCompletados, indice]
        })),
      setNivelLectura: (nivel) =>
        set({ nivelLectura: nivel }),
      setLecturaActual: (indice) =>
        set({ lecturaActual: indice }),
      reiniciarProgreso: () =>
        set({
          progreso: {
            comprension: 0,
            vocabulario: 0,
            pensamiento_critico: 0
          },
          materialesCompletados: [],
          lecturaActual: 0
        })
    }),
    {
      name: 'tutor-lectura-storage'
    }
  )
);

export default useStore;

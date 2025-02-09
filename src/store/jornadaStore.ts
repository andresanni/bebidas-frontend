import { create } from "zustand";
import { Jornada, Pedido, Item } from "../types";

type JornadaStore = {
  jornada: Jornada | null;
  pedidos: Pedido[];
  setJornada: (jornada: Jornada) => void;
  setPedidos: (pedidos: Pedido[]) => void;
  agregarPedido: (pedido: Pedido) => void;
  agregarItem: (pedidoId: string, item: Item) => void;
};

export const useJornadaStore = create<JornadaStore>((set) => ({
  jornada: null,
  pedidos: [],
  setJornada: (jornada) => set({ jornada }),
  setPedidos: (pedidos) => set({ pedidos }),
  agregarPedido: (pedido) =>
    set((state) => {
      const existePedido = state.pedidos.some((p) => p.id === pedido.id);
      if (!existePedido) {
        return { pedidos: [...state.pedidos, pedido] };
      }
      return state;
    }),
  agregarItem: (pedidoId, item) =>
    set((state) => {
      const newPedidos = state.pedidos.map((p) => {
        if (p.id === pedidoId) {
          const existeItem = p.items.some((i) => i.id === item.id);
          if (!existeItem) {
            return { ...p, items: [...p.items, item] };
          }
        }
        return p;
      });

      return { pedidos: newPedidos };
    }),
}));

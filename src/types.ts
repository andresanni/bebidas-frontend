export type Bebida = {
  id: string;
  nombre: string;
  precio: number;
  bonificacion: number;
};

export type BebidaInput = Omit<Bebida, "id">;

export type Item = {
  id: string;
  pedido_id: string;
  bebida_id: string;
  cantidad: number;
  subtotal: number;
  bebida: Bebida;
};

export type ItemInput = Omit<Item, "id" | "bebida">;

export type Jornada = {
  id: string;
  fecha: string;
};

export type JornadaInput = Omit<Jornada, "id">;

export type Mesa = {
  id: string;
  numero: string;
};

export type Mozo = {
  id: string;
  nombre: string;
  apellido: string;
};

export type MozoInput = Omit<Mozo, "id">;

export type Estado = {
  id: string;
  descripcion: string;
};

export type EstadoInput = Omit<Estado, "id">;

export type Pedido = {
  id: string;
  mozo_id: string | null;
  mesa_id: string | null;
  jornada_id: string | null;
  estado_id: string | null;
  total: number | null;
  adultos: number | null;
  menores: number | null;
  mozo: Mozo | null;
  mesa: Mesa | null;
  estado: Estado | null;
  items: Item[];
};

export type PedidoInput = {
  mesa_id: string;
  mozo_id: string;
  adultos: number;
  menores: number;
  jornada_id: string;
};

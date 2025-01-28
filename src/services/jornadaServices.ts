import { supabase } from "../supabaseClient";

export type Jornada = {
  id: string;
  fecha: string;
};

export type JornadaInput = {
  fecha: string;
};

export type Pedido = {
  id: string;
  mozo_id: string;
  mesa_id: string;
  jornada_id: string;
  estado_id: string;
  total: number;
  mozo: {
    nombre: string;
    apellido: string;
  };
  mesa: {
    numero: string;
  };
  items: {
    id: string;
    bebida_id: string;
    cantidad: number;
    subtotal: number;
    bebida: {
      nombre: string;
      precio: number;
    };
  }[];
};

export const getJornadas = async () => {
  const { data, error } = await supabase.from("jornadas").select("*");
  if (error) {
    throw error;
  }
  return data;
};

export const createJornada = async (jornada: JornadaInput) => {
  const { error } = await supabase.from("jornadas").insert(jornada);
  if (error) {
    throw error;
  }
};

export const getJornadaById = async (id: string) => {
  const { data, error } = await supabase
    .from("jornadas")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }
  return data;
};

export const getJornadaDetails = async (jornadaId: string) => {
  const { data, error } = await supabase
    .from("pedidos")
    .select(
      `
      id,
      mozo_id,
      mesa_id,
      jornada_id,
      estado_id,
      total,
      mozo: mozo_id (nombre, apellido),
      mesa: mesa_id (numero),
      items: items (
        id,
        bebida_id,
        cantidad,
        subtotal,
        bebida: bebida_id (nombre, precio)
      )
    `
    )
    .eq("jornada_id", jornadaId);

  if (error) {
    throw error;
  }

  return data as unknown as Pedido[];
};

import { supabase } from "../supabaseClient";
import { Pedido, PedidoInput, Item, ItemInput } from "../types";

export const getPedidosByJornadaId = async (
  jornadaId: string,
  options?: { signal?: AbortSignal }
) => {
  const query = supabase
    .from("pedidos")
    .select(
      `
      id,
      mozo_id,
      mesa_id,
      jornada_id,
      estado_id,
      total,
      adultos,
      menores,
      mozo: mozo_id (id,nombre, apellido),
      mesa: mesa_id (id, numero),
      estado: estado_id (descripcion),
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

  if (options?.signal) {
    query.abortSignal(options.signal);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data as unknown as Pedido[];
};

export const createPedido = async (pedido: PedidoInput): Promise<Pedido> => {
  const { data, error } = await supabase
    .from("pedidos")
    .insert(pedido)
    .select(`*, mesa:mesa_id (*), mozo:mozo_id (*)`)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const createItem = async (item: ItemInput): Promise<Item> => {
  const { data, error } = await supabase.from("items").insert(item).select();
  if (error) throw error;

  return data[0];
};

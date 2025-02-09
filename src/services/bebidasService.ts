import { supabase } from "../supabaseClient";
import { Bebida, BebidaInput } from "../types";

export const getBebidas = async (options?: {
  signal?: AbortSignal;
}): Promise<Bebida[]> => {
  const query = supabase.from("bebidas").select("*");

  if (options?.signal) {
    query.abortSignal(options.signal);
  }

  const { data, error } = await query;
  if (error) {
    throw error;
  }
  return data;
};

export const deleteBebida = async (id: string) => {
  const { error } = await supabase.from("bebidas").delete().eq("id", id);
  if (error) {
    throw error;
  }
};

export const updateBebida = async (bebida: Bebida) => {
  const { error } = await supabase
    .from("bebidas")
    .update(bebida)
    .eq("id", bebida.id);
  if (error) {
    throw error;
  }
};

export const createBebida = async (bebida: BebidaInput) => {
  const { error } = await supabase.from("bebidas").insert(bebida);
  if (error) {
    throw error;
  }
};

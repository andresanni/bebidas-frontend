import { supabase } from "../supabaseClient";
import { Mozo, MozoInput } from "../types";

export const getMozos = async (options?: {
  signal?: AbortSignal;
}): Promise<Mozo[]> => {
  const query = supabase.from("mozos").select("*");
  if (options?.signal) {
    query.abortSignal(options.signal);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }
  return data;
};

export const deleteMozo = async (id: string) => {
  const { error } = await supabase.from("mozos").delete().eq("id", id);
  if (error) {
    throw error;
  }
};

export const updateMozo = async (mozo: Mozo) => {
  const { error } = await supabase.from("mozos").update(mozo).eq("id", mozo.id);
  if (error) {
    throw error;
  }
};

export const createMozo = async (mozo: MozoInput) => {
  const { error } = await supabase.from("mozos").insert(mozo);
  if (error) {
    throw error;
  }
};

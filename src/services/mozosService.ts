import { supabase } from "../supabaseClient";

export type Mozo = {
  id: string;
  nombre: string;
  apellido: string;
};

export type MozoInput = {
  nombre: string;
  apellido: string;
};

export const getMozos = async (): Promise<Mozo[]> => {
  const { data, error } = await supabase.from("mozos").select("*");
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

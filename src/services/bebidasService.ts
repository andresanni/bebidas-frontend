import { supabase } from "../supabaseClient";

export type Bebida = {
  id: string;
  nombre: string;
  precio: number;
};

export type BebidaInput = {
  nombre: string;
  precio: number;
};

export const getBebidas = async (): Promise<Bebida[]> => {
  const { data, error } = await supabase.from("bebidas").select("*");
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

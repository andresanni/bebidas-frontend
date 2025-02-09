import { supabase } from "../supabaseClient";
import { Jornada, JornadaInput } from "../types";

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

export const getJornadaById = async (id: string): Promise<Jornada> => {
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

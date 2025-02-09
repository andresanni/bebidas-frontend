import { supabase } from "../supabaseClient";
import { Mesa } from "../types";

export const getMesas = async (options?: { signal?: AbortSignal }) => {
  const query = supabase.from("mesas").select("*");

  if (options?.signal) {
    query.abortSignal(options.signal);
  }

  const { data, error } = await query;

  if (error) {
    throw error;
  }

  return data as Mesa[];
};

import { supabase } from "../supabaseClient";
import { Item, ItemInput } from "../types";

export const createItem = async (item: ItemInput): Promise<Item> => {
  const { data, error } = await supabase.from("items").insert(item).select();
  if (error) {
    throw error;
  }
  return data[0];
};

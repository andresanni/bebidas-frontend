import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";

export const formatDate = (dateString: string): string => {
  const date = parseISO(dateString); // Interpreta la fecha correctamente sin desfase de UTC
  const formattedDate = format(date, "EEEE d 'de' MMMM yyyy", { locale: es });
  return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
};

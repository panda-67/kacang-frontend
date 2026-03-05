import { format } from "date-fns"
import { id } from "date-fns/locale"

export const formatDateID = (date: string) => {
  return format(new Date(date), 'd MMMM yyyy · HH:mm', { locale: id })
}



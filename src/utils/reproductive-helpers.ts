import { DateService } from "@/lib/date-fns/dates";

const { addDaysToDate, formatToStoredDate } = DateService;

const addRange = (
  starting_date: string,
  min_days: number,
  max_days: number,
) => {
  const minDate =
    formatToStoredDate(addDaysToDate(starting_date, min_days)) ?? "";
  const maxDate =
    formatToStoredDate(addDaysToDate(starting_date, max_days)) ?? "";

  return { minDate, maxDate };
};

export { addRange };

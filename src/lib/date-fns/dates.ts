import { format, isValid, parseISO, addDays } from "date-fns";
import { es } from "date-fns/locale/es";
import { enUS } from "date-fns/locale/en-US";

type Languages = "es" | "en";
type StoreDate = Date | string | undefined | null;
type UnformattedString = string | undefined | null;

export class DateService {
  private static readonly locales: Record<Languages, typeof es> = {
    en: enUS,
    es: es,
  };

  private static readonly formats: Record<Languages, string> = {
    es: "d 'de' MMMM 'de' yyyy",
    en: "MMMM do, yyyy",
  };

  public static addDaysToDate(date: Date | string | undefined, days: number) {
    if (!date) {
      throw new Error("Date is required");
    }

    const parsedDate = typeof date === "string" ? parseISO(date) : date;

    if (!isValid(parsedDate)) {
      throw new Error("Invalid date format");
    }

    return addDays(parsedDate, days);
  }

  public static formatToLongDate(date: StoreDate, language: Languages) {
    if (!date || date === "undefined") return;

    const parsedDate = typeof date === "string" ? parseISO(date) : date;

    if (!isValid(parsedDate)) {
      console.warn(`DateService: Invalid date format ${parsedDate}`);
      return undefined;
    }

    const selectedLanguage = language in DateService.formats ? language : "en";
    const formatPattern = DateService.formats[selectedLanguage];
    const locale = DateService.locales[selectedLanguage];

    return format(parsedDate, formatPattern, {
      locale,
    });
  }

  public static formatToStoredDate(date: StoreDate) {
    if (!date || date === undefined) {
      return;
    }

    const parsedDate = typeof date === "string" ? parseISO(date) : date;

    if (!isValid(parsedDate)) {
      console.warn(`DateService: Invalid date format ${date.toString()}`);
      return undefined;
    }

    return format(parsedDate, "yyyy-MM-dd");
  }

  public static parseToDate(unformattedString: UnformattedString) {
    if (!unformattedString || unformattedString === undefined) {
      return;
    }

    const parsedDate = parseISO(unformattedString);

    if (!isValid(parsedDate)) {
      console.warn(`DateService: Invalid date format: ${unformattedString}`);
      return undefined;
    }

    return parsedDate;
  }
}

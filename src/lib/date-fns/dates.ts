import { format, isValid, parseISO } from "date-fns";
import { es, enUS } from "date-fns/locale";
import { DATE_EN_FORMAT, DATE_ES_FORMAT } from "@/utils/consts";

type IsoString = string | undefined;
type Languages = "es" | "en";
type StoreDate = Date | string | undefined | null;
type UnformattedString = string | undefined | null;

export class DateService {
  private static readonly locales: Record<Languages, typeof es> = {
    en: enUS,
    es: es,
  };

  private static readonly formats: Record<Languages, string> = {
    es: DATE_ES_FORMAT,
    en: DATE_EN_FORMAT,
  };

  public static formatToLongDate(isoString: IsoString, language: Languages) {
    if (!isoString || isoString === "undefined") return;
    const date = new Date(isoString);

    if (isNaN(date.getTime())) {
      console.warn(`DateService: Invalid date format ${isoString}`);
      return undefined;
    }

    return format(date, this.formats[language], {
      locale: this.locales[language],
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

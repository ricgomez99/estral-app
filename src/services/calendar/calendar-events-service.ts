import { MarkedDate, IPeriodMetadata, MarkType } from "@/types/calendar-types";
import { DateService } from "@/lib";

enum MarkColors {
  transfer_range = "#FB8C00",
  natural_range = "#43A047",
  insemination_range = "#E53935",
  donant_transfer_range = "#8E24AA",
}

export const CalendarEventsService = {
  createMarkedDate(
    minDate: string,
    maxDate: string,
    markType: MarkType,
    metadata: IPeriodMetadata,
    existingMarks: MarkedDate = {},
  ): MarkedDate {
    const { parseToDate, formatToStoredDate } = DateService;
    let currentDate = parseToDate(minDate)!;
    const lastDate = parseToDate(maxDate)!;

    if (!currentDate || !lastDate) {
      return existingMarks;
    }

    const marks: MarkedDate = { ...existingMarks };

    while (currentDate <= lastDate) {
      const formattedDate = formatToStoredDate(currentDate)!;
      const isStart = formattedDate === minDate;
      const isEnd = formattedDate === maxDate;
      const period = {
        startingDay: isStart,
        endingDay: isEnd,
        color: MarkColors[markType],
        animalName: metadata.animalName,
        eventType: metadata.eventType,
        description: metadata.description,
      };

      if (marks[formattedDate]) {
        marks[formattedDate] = {
          ...marks[formattedDate],
          periods: [...(marks[formattedDate].periods || []), period],
        };
      } else {
        marks[formattedDate] = {
          periods: [period],
        };
      }

      // Update current date for full range coverage
      currentDate = DateService.addDaysToDate(currentDate, 1);
    }
    return marks;
  },
};

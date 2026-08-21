import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";

interface ICalendarPeriod {
  startingDay?: boolean;
  endingDay?: boolean;
  color?: string;
  animalName: string;
  eventType: string;
  description: string;
}

interface IPeriodMetadata {
  animalName: string;
  eventType: string;
  description: string;
}

interface IDot {
  key: string;
  color: string;
  selectedDotColor: string;
}

type MarkedDate = Record<string, Partial<MarkingProps>>;
type MarkType = "transfer_range" | "natural_range" | "insemination_range";
type Dots = IDot[];
type Periods = ICalendarPeriod[];

export type { MarkedDate, ICalendarPeriod, IPeriodMetadata, Periods, MarkType };

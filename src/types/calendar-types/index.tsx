import { MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import { ReproductiveEventType } from "../mock-types";

interface ICalendarPeriod extends IPeriodMetadata {
  startingDay?: boolean;
  endingDay?: boolean;
  color?: string;
}

interface IPeriodMetadata {
  animalName: string | undefined;
  eventType: ReproductiveEventType;
  description: string | undefined;
}

interface IDot {
  key: string;
  color: string;
  selectedDotColor: string;
}

type MarkedDate = Record<string, Partial<MarkingProps>>;
type MarkType =
  | "transfer_range"
  | "natural_range"
  | "insemination_range"
  | "donant_transfer_range";
type Dots = IDot[];
type Periods = ICalendarPeriod[];

export type { MarkedDate, ICalendarPeriod, IPeriodMetadata, Periods, MarkType };

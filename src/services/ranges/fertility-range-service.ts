import { DateService } from "@/lib";
import { IFertilityRange } from "@/types/mock-types";

type RangeProcess = "progesterone" | "gnrh" | "natural";

export function calculateFertilityRange(
  startingDate: string,
  processType: RangeProcess,
) {
  const daysPerMedication: Record<RangeProcess, { min: number; max: number }> =
    {
      progesterone: {
        min: 3,
        max: 5,
      },
      gnrh: {
        min: 1,
        max: 2,
      },
      natural: {
        min: 18,
        max: 23,
      },
    };

  const { min, max } = daysPerMedication[processType];

  const minDate = DateService.addDaysToDate(startingDate, min);
  const maxDate = DateService.addDaysToDate(startingDate, max);

  return {
    minDate,
    maxDate,
  };
}

export function getRangeDates(
  data: IFertilityRange,
  lastOestrus: string | undefined,
) {
  if (data.medicated && data.application_date && data.medication) {
    return calculateFertilityRange(data.application_date, data.medication);
  }
  if (lastOestrus) {
    return calculateFertilityRange(lastOestrus, "natural");
  }

  return null;
}

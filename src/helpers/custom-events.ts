import { addRange } from "@/utils/reproductive-helpers";
import { DateService } from "@/lib/date-fns/dates";
import { REPRODUCTIVE_MILESTONES_RECEPTOR_TRANSFER } from "@/utils/consts";

import {
  ICalculateRangeProps,
  ICreateReproductiveEventPayload,
} from "@/types/reproductive-calculation-types";
import { MarkType } from "@/types/mock-types";

const generateRecipientTranferEvent = (
  options: ICalculateRangeProps,
  markType: MarkType,
): ICreateReproductiveEventPayload[] => {
  const { starting_date, animal_id, animal_name, embryon_days = 7 } = options;
  const { addDaysToDate, formatToStoredDate } = DateService;
  const milestones = Object.entries(REPRODUCTIVE_MILESTONES_RECEPTOR_TRANSFER);
  const events = [];

  const adjustedAnchorDate = formatToStoredDate(
    addDaysToDate(starting_date, -embryon_days),
  );

  if (!adjustedAnchorDate) {
    throw new Error(`Invalid starting_date provided: ${starting_date}`);
  }

  for (const [_, value] of milestones) {
    const { minDate, maxDate } = addRange(
      adjustedAnchorDate,
      value.min_days,
      value.max_days,
    );
    const payload: ICreateReproductiveEventPayload = {
      animal_id: animal_id,
      animal_name: animal_name,
      event_type: value.event_type,
      mark_type: markType,
      title: value.title,
      description: value.description,
      min_date: minDate,
      max_date: maxDate,
      completed: false,
    };

    events.push(payload);
  }

  return events;
};

export { generateRecipientTranferEvent };

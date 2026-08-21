import { ICreateReproductiveEventPayload } from "@/types/reproductive-calculation-types";
import {
  REPRODUCTIVE_MILESTONES,
  REPRODUCTIVE_MILESTONES_DONANT_TRANSFER,
} from "@/utils/consts";
import { addRange } from "@/utils/reproductive-helpers";
import { MarkType } from "@/types/mock-types";

interface IProps {
  starting_date: string;
  animal_id: string;
  animal_name: string;
  mark_type: MarkType;
  isDonor?: boolean;
  isTransfer?: boolean;
}

export const generateEventsArray = (props: IProps) => {
  const {
    starting_date,
    animal_id,
    animal_name,
    mark_type,
    isDonor,
    isTransfer,
  } = props;
  const events: ICreateReproductiveEventPayload[] = [];
  let entries;

  if (isDonor && isTransfer) {
    entries = Object.entries(REPRODUCTIVE_MILESTONES_DONANT_TRANSFER);
  } else {
    entries = Object.entries(REPRODUCTIVE_MILESTONES);
  }

  for (const [_, value] of entries) {
    const { minDate, maxDate } = addRange(
      starting_date,
      value.min_days,
      value.max_days,
    );

    const payload: ICreateReproductiveEventPayload = {
      animal_id: animal_id,
      animal_name: animal_name,
      event_type: value.event_type,
      mark_type: mark_type,
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

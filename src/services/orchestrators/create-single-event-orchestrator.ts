import { Result, EventsOrchestrator } from "@/helpers/events-orchestrator";
import { IReproductiveEvent } from "@/types/mock-types";
import {
  calculateReproductiveRangeStep,
  buildCalendarMarksStep,
  persistEventStep,
} from "@/helpers/middlewares/single-event-orchestrator-middlewares";
import { ICreateEventContext } from "@/types/middlewares-types/event-orchestrator-types";
import { CreateReproductiveEventData } from "@/lib/zod-schemas/createReproductiveEventsSchema";
import * as crypto from "expo-crypto";

interface IDataProps extends CreateReproductiveEventData {
  id: string;
  name: string;
  is_donor: boolean;
  is_recipient: boolean;
}

export async function runCreateSingleEventOrchestrator(
  data: IDataProps,
  ownerId: string,
): Promise<Result<IReproductiveEvent[], Error>> {
  if (!data.reproduction_details) {
    return Result.err(new Error("Reproduction details are required"));
  }

  const cycle_id = crypto.randomUUID();

  const initialContext: ICreateEventContext = {
    cycle_id,
    input: {
      animalData: {
        id: data.id,
        owner_id: ownerId,
        name: data.name,
        is_donor: data.is_donor ?? false,
        is_recipient: data.is_recipient ?? false,
        last_oestrus: data.last_oestrus,
        reproduction_details: data.reproduction_details,
      },
      reproductionConfig: {
        type: data.reproduction_details.type,
        starting_date: data.reproduction_details.date,
        embryon_days:
          data.reproduction_details.type === "transfer"
            ? data.reproduction_details.embryon_days
            : undefined,
      },
      notificationOptions: {
        profileId: ownerId,
      },
    },
  };
  const orchestrator = new EventsOrchestrator<ICreateEventContext>();
  orchestrator
    .use(calculateReproductiveRangeStep)
    .use(buildCalendarMarksStep)
    .use(persistEventStep);

  const pipelineResult = await orchestrator.execute(initialContext);
  if (!pipelineResult.ok) {
    return Result.err(pipelineResult.error);
  }

  const finalCtx = pipelineResult.value;

  return Result.ok(finalCtx.persistedEvents ?? []);
}

import { createReproductionEvent } from "@/lib/supabase-data-management/data-management";
import {
  ICreateEventContext,
  PipelineStep,
} from "@/types/middlewares-types/event-orchestrator-types";
import {
  ICalculateRangeProps,
  IInsertReproductionEventDTO,
} from "@/types/reproductive-calculation-types";
import { ReproductiveRangeFactory } from "@/services/ranges/reproductive-type-service";
import createMarkedDatesFromEevents from "@/utils/createMarkedDates";

const calculateReproductiveRangeStep: PipelineStep<
  ICreateEventContext
> = async (ctx, next) => {
  const { reproductionConfig, animalData } = ctx.input;
  if (!reproductionConfig) {
    await next();
    return;
  }

  const animalId = animalData.id ?? "";
  const animalName = animalData.name ?? "";

  const calculator = ReproductiveRangeFactory.createRange(
    reproductionConfig.type,
  );

  const calculateProps: ICalculateRangeProps = {
    type: reproductionConfig.type,
    starting_date: reproductionConfig.starting_date,
    animal_id: String(animalId),
    animal_name: animalName,
    isDonor: reproductionConfig.isDonor ?? false,
    isRecipient: reproductionConfig.isRecipient ?? false,
    ...(reproductionConfig.embryon_days !== undefined && {
      embryon_days: reproductionConfig.embryon_days,
    }),
  };

  const result = calculator.calculateRange(calculateProps);

  ctx.calculatedEvents = result.eventsToCreate;
  ctx.suggestedCondition = result.suggestedCondition;

  await next();
};

const buildCalendarMarksStep: PipelineStep<ICreateEventContext> = async (
  ctx,
  next,
) => {
  const events = ctx.calculatedEvents;

  if (!events || events.length === 0) {
    await next();
    return;
  }

  const calendarMarks = ctx.calendarMarks ?? {};

  const markedDates = createMarkedDatesFromEevents(events, calendarMarks);

  ctx.calendarMarks = markedDates;

  await next();
};

const persistEventStep: PipelineStep<ICreateEventContext> = async (
  ctx,
  next,
) => {
  const { input, calculatedEvents, cycle_id } = ctx;
  if (!input.reproductionConfig && !input.animalData) {
    await next();
    return;
  }

  if (!cycle_id) {
    throw new Error(
      'Pipeline Error: "cycle_id" standard attribute is missing from orchestration context.',
    );
  }

  const { id } = input.animalData;

  const eventPayload: IInsertReproductionEventDTO[] = (
    calculatedEvents || []
  ).map((event) => ({
    owner_id: input.notificationOptions?.profileId ?? "",
    cycle_id,
    animal_name: input.animalData.name ?? "",
    event_type: event.event_type,
    mark_type: event.mark_type,
    title: event.title,
    description: String(event.description) ?? null,
    min_date: event.min_date,
    max_date: event.max_date,
    completed: event.completed ?? false,
    medicated: event.medicated ?? false,
    medication: event.medication ?? null,
  }));

  const { insertedEvents } = await createReproductionEvent(
    eventPayload,
    String(id),
  );

  ctx.persistedEvents = insertedEvents;
  await next();
};

export {
  persistEventStep,
  calculateReproductiveRangeStep,
  buildCalendarMarksStep,
};

import { PipelineStep } from "@/types/middlewares-types/event-orchestrator-types";
import { ReproductiveRangeFactory } from "@/services/ranges/reproductive-type-service";
import { ICalculateRangeProps } from "@/types/reproductive-calculation-types";
import { MarkedDate } from "@/types/calendar-types";
import { CalendarEventsService } from "@/services";
import { createAnimalWithEvents } from "@/lib/supabase-data-management/data-management";

const calculateReproductiveRangeStep: PipelineStep = async (ctx, next) => {
  const { reproductionConfig } = ctx.input;
  if (!reproductionConfig) {
    await next();
    return;
  }

  const animalId = String(ctx.createdAnimal?.id) ?? "";
  const animalName = ctx.createdAnimal?.name ?? "";

  const calculator = ReproductiveRangeFactory.createRange(
    reproductionConfig.type,
  );

  const calculateProps: ICalculateRangeProps = {
    type: reproductionConfig.type,
    starting_date: reproductionConfig.starting_date,
    animal_id: animalId,
    animal_name: animalName,
    isDonor: reproductionConfig.isDonor ?? false,
    isTransfer: reproductionConfig.isTransfer ?? false,
    ...(reproductionConfig.embryon_days !== undefined && {
      embryon_days: reproductionConfig.embryon_days,
    }),
  };
  const result = calculator.calculateRange(calculateProps);

  ctx.calculatedEvents = result.eventsToCreate;
  ctx.suggestedCondition = result.suggestedCondition;

  await next();
};

const buildCalendarMarksStep: PipelineStep = async (ctx, next) => {
  const events = ctx.calculatedEvents;

  if (!events || events.length === 0) {
    await next();
    return;
  }

  let cumulativeMarks: MarkedDate = ctx.calendarMarks ?? {};

  for (const event of events) {
    cumulativeMarks = CalendarEventsService.createMarkedDate(
      event.min_date,
      event.max_date,
      event.mark_type,
      {
        animalName: event.animal_name,
        eventType: event.event_type,
        description: event.description as string,
      },
      cumulativeMarks,
    );
  }

  ctx.calendarMarks = cumulativeMarks;

  await next();
};

const persistAnimalAndEventsStep: PipelineStep = async (ctx, next) => {
  const { input, calculatedEvents, suggestedCondition } = ctx;
  if (!input.animalData) {
    await next();
    return;
  }

  const animalPayload = {
    owner_id: input.animalData.owner_id,
    name: input.animalData.name,
    age: input.animalData.age,
    type: input.animalData.type,
    sex: input.animalData.sex,
    breed: input.animalData.breed ?? null,
    condition: suggestedCondition ?? input.animalData.condition ?? null,
    microchip_id: input.animalData.microchip_id ?? null,
    is_recipient: input.animalData.is_recipient ?? false,
    is_donor: input.animalData.is_donor ?? false,
    image: input.animalData.image ?? null,
    last_oestrus: input.animalData.last_oestrus ?? null,
    reproduction_details: input.reproductionConfig
      ? {
          type: input.reproductionConfig.type,
          date: input.reproductionConfig.starting_date,
          ...(input.reproductionConfig.embryon_days !== undefined && {
            embryon_days: input.reproductionConfig.embryon_days,
          }),
        }
      : null,
  };

  const eventsPayload = (calculatedEvents || []).map((event) => ({
    owner_id: input.notificationOptions?.profileId ?? "",
    event_type: event.event_type,
    mark_type: event.mark_type,
    title: event.title,
    description: event.description ?? null,
    min_date: event.min_date,
    max_date: event.max_date,
    completed: event.completed ?? false,
  }));

  const { animal, events } = await createAnimalWithEvents(
    eventsPayload,
    animalPayload,
  );

  ctx.createdAnimal = animal;
  ctx.persistedEvents = events;

  await next();
};

export {
  calculateReproductiveRangeStep,
  buildCalendarMarksStep,
  persistAnimalAndEventsStep,
};

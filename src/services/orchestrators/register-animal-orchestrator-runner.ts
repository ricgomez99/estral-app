import { EventsOrchestrator, Result } from "@/helpers/events-orchestrator";
import {
  uploadAnimalImageStep,
  calculateReproductiveRangeStep,
  buildCalendarMarksStep,
  persistAnimalAndEventsStep,
} from "@/helpers/middlewares/events-orchestrator-middlewares";
import { AnimalFormData } from "@/lib/zod-schemas";
import { IContext } from "@/types/middlewares-types/event-orchestrator-types";
import { IAnimal } from "@/types/mock-types";
import { ReproductiveConfigBuilder } from "../ranges/reproductive-config-builder";

export async function runAnimalCreationPipeline(
  formData: AnimalFormData,
  ownerId: string,
): Promise<Result<IAnimal, Error>> {
  const reproductionConfig =
    ReproductiveConfigBuilder.buildFromFormData(formData);

  const initialContext: IContext = {
    input: {
      animalData: {
        owner_id: ownerId,
        name: formData.name,
        type: formData.type,
        breed: formData.breed,
        condition: formData.condition,
        microchip_id: formData.microchipId ?? null,
        is_recipient: formData.isRecipient ?? false,
        is_donor: formData.isDonor ?? false,
        sex: formData.sex,
        age: formData.age,
        image: formData.image ?? null,
        last_oestrus: formData.last_oestrus,
        reproduction_details: formData.reproduction_details,
      },
      reproductionConfig,
      notificationOptions: {
        profileId: ownerId,
      },
    },
  };

  const orchestrator = new EventsOrchestrator();

  orchestrator
    .use(uploadAnimalImageStep)
    .use(calculateReproductiveRangeStep)
    .use(buildCalendarMarksStep)
    .use(persistAnimalAndEventsStep);

  const pipelineResult = await orchestrator.execute(initialContext);

  if (!pipelineResult.ok) {
    return Result.err(pipelineResult.error);
  }

  const finalCtx = pipelineResult.value;

  if (!finalCtx.createdAnimal) {
    return Result.err(
      new Error(
        "Pipeline finished successfully but createdAnimal was not found in context.",
      ),
    );
  }

  return Result.ok(finalCtx.createdAnimal);
}

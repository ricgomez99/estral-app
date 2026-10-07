import { MarkedDate } from "../calendar-types";
import { IAnimal, IReproductiveEvent } from "../mock-types";
import {
  INotificationOptions,
  INotificationPayloadData,
  INotificationFunctionResponse,
} from "../notifications";
import {
  ReproductionType,
  ICreateReproductiveEventPayload,
} from "../reproductive-calculation-types";

interface IOrchestratorInput {
  animalData: Omit<IAnimal, "id" | "events">;
  reproductionConfig?: {
    type: ReproductionType;
    starting_date: string;
    embryon_days?: number;
    isDonor?: boolean;
    isRecipient?: boolean;
  };
  notificationOptions?: INotificationOptions;
}

interface ICreateEventOrchestrationInput extends Omit<
  IOrchestratorInput,
  "animalData"
> {
  animalData: Omit<
    IAnimal,
    | "events"
    | "image"
    | "age"
    | "type"
    | "sex"
    | "microchip_id"
    | "condition"
    | "breed"
  >;
}

interface IContext {
  readonly input: IOrchestratorInput;
  createdAnimal?: IAnimal;
  calculatedEvents?: ICreateReproductiveEventPayload[];
  suggestedCondition?: string;
  calendarMarks?: MarkedDate;
  persistedEvents?: IReproductiveEvent[];
  notificationPayloads?: INotificationPayloadData[];
  notificationResults?: INotificationFunctionResponse[];
  error?: Error;
  cycle_id?: string;
}

interface ICreateEventContext extends Omit<
  IContext,
  "createdAnimal" | "input"
> {
  readonly input: ICreateEventOrchestrationInput;
}

type PipelineStep<T> = (context: T, next: () => Promise<void>) => Promise<void>;

type CreateEventPipelineStep = (
  context: ICreateEventContext,
  next: () => Promise<void>,
) => Promise<void>;

export {
  IOrchestratorInput,
  IContext,
  ICreateEventContext,
  PipelineStep,
  CreateEventPipelineStep,
};

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
    isTransfer?: boolean;
  };
  notificationOptions?: INotificationOptions;
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
}

type PipelineStep = (
  context: IContext,
  next: () => Promise<void>,
) => Promise<void>;

export { IOrchestratorInput, IContext, PipelineStep };

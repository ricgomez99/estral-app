import {
  MarkType,
  ReproductiveEventType,
  ReproductiveCondition,
} from "../mock-types";

type ReproductionType = "natural" | "insemination" | "transfer";

interface ICalculateRangeProps {
  type: ReproductionType;
  starting_date: string;
  animal_id: string;
  animal_name: string;
  isDonor: boolean;
  isTransfer: boolean;
  end_date?: string;
  embryon_days?: number;
}
interface ICreateReproductiveEventPayload {
  animal_id: string;
  animal_name: string;
  event_type: ReproductiveEventType;
  mark_type: MarkType;
  title: string;
  description?: string;
  min_date: string; // YYYY-MM-DD
  max_date: string; // YYYY-MM-DD
  completed: boolean;
}

interface IInsertReproductionEventDTO extends Omit<
  ICreateReproductiveEventPayload,
  "animal_name"
> {
  owner_id: string;
}

interface IReproductiveFactoryResult {
  suggestedCondition: ReproductiveCondition;
  eventsToCreate: ICreateReproductiveEventPayload[];
}

interface IRreproductiveCalculator {
  calculateRange(options: ICalculateRangeProps): IReproductiveFactoryResult;
}

interface IReproductiveMilestoneBody {
  min_days: number;
  max_days: number;
  title: string;
  description: string;
  event_type: ReproductiveEventType;
}

interface IReproductionStrategyConfig {
  type: ReproductionType;
  defaultMark: MarkType;
  suggestedCondition: ReproductiveCondition;
  customEventGenerator?: (
    options: ICalculateRangeProps,
    markType: MarkType,
  ) => ICreateReproductiveEventPayload[];
}

type ReproductiveMilestone = Record<string, IReproductiveMilestoneBody>;

export type {
  IRreproductiveCalculator,
  IReproductionStrategyConfig,
  IInsertReproductionEventDTO,
  ReproductionType,
  IReproductiveFactoryResult,
  ICalculateRangeProps,
  ICreateReproductiveEventPayload,
  ReproductiveMilestone,
};

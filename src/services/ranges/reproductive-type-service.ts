import {
  IReproductiveFactoryResult,
  IRreproductiveCalculator,
  ICalculateRangeProps,
  ReproductionType,
  IReproductionStrategyConfig,
} from "@/types/reproductive-calculation-types";

import { generateEventsArray } from "@/helpers/generate-events-array";
import { REPRODUCTION_STRATEGIES } from "@/helpers/reproduction-strategies";

class ReproductiveCalculator implements IRreproductiveCalculator {
  constructor(private readonly config: IReproductionStrategyConfig) {}

  calculateRange(options: ICalculateRangeProps): IReproductiveFactoryResult {
    const { type, starting_date, animal_id, animal_name, isDonor } = options;

    if (type !== this.config.type) {
      throw new Error(
        `Mismatch reproduction type. Expected: ${this.config.type}, got: ${type}`,
      );
    }

    const isDonorTransfer = type === "transfer" && isDonor;

    const markType = isDonorTransfer
      ? "donant_transfer_range"
      : this.config.defaultMark;

    const condition = isDonorTransfer ? "Open" : this.config.suggestedCondition;

    const events = this.config.customEventGenerator
      ? this.config.customEventGenerator(options, markType)
      : generateEventsArray({
          starting_date,
          animal_id,
          animal_name,
          mark_type: markType,
          isDonor,
        });
    return {
      suggestedCondition: condition,
      eventsToCreate: events,
    };
  }
}

export class ReproductiveRangeFactory {
  static createRange(type: ReproductionType): IRreproductiveCalculator {
    const strategyConfig = REPRODUCTION_STRATEGIES[type];

    if (!strategyConfig) {
      throw new Error(`Unregistered type: ${type}`);
    }

    return new ReproductiveCalculator(strategyConfig);
  }
}

import {
  ReproductionType,
  IReproductionStrategyConfig,
} from "@/types/reproductive-calculation-types";
import {
  generateRecipientTranferEvent,
  generateNextOestrusEvent,
} from "./custom-events";

export const REPRODUCTION_STRATEGIES: Record<
  ReproductionType,
  IReproductionStrategyConfig
> = {
  natural: {
    type: "natural",
    defaultMark: "natural_range",
    suggestedCondition: "Pregnant",
  },
  insemination: {
    type: "insemination",
    defaultMark: "insemination_range",
    suggestedCondition: "Pregnant",
  },
  transfer: {
    type: "transfer",
    defaultMark: "transfer_range",
    suggestedCondition: "Pregnant",
    customEventGenerator: generateRecipientTranferEvent,
  },
  oestrus: {
    type: "oestrus",
    defaultMark: "natural_range",
    suggestedCondition: "Not Pregnant",
    customEventGenerator: generateNextOestrusEvent,
  },
};

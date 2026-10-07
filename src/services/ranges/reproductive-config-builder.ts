import { AnimalFormData } from "@/lib/zod-schemas";
import { ReproductionType } from "@/types/reproductive-calculation-types";

export interface IReproductiveInput {
  type: ReproductionType;
  starting_date: string;
  embryon_days?: number;
  isDonor?: boolean;
  isRecipient?: boolean;
}

export class ReproductiveConfigBuilder {
  static buildFromFormData(
    formData: AnimalFormData,
  ): IReproductiveInput | undefined {
    if (formData.sex !== "Female") return undefined;

    if (formData.condition === "Pregnant" && formData.reproduction_details) {
      const embryonDays =
        formData.reproduction_details.type === "transfer"
          ? formData.reproduction_details.embryon_days
          : undefined;

      return {
        type: formData.reproduction_details.type,
        starting_date: formData.reproduction_details.date,
        embryon_days: embryonDays,
        isDonor: Boolean(formData.isDonor),
        isRecipient:
          formData.reproduction_details.type === "transfer"
            ? Boolean(formData.isRecipient)
            : false,
      };
    }

    if (formData.last_oestrus) {
      return {
        type: "oestrus",
        starting_date: formData.last_oestrus,
        isDonor: Boolean(formData.isDonor),
        isRecipient: Boolean(formData.isRecipient),
      };
    }

    return undefined;
  }
}

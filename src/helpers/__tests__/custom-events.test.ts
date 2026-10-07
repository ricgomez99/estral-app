import { ICalculateRangeProps } from "@/types/reproductive-calculation-types";
import { generateRecipientTranferEvent } from "../custom-events";
import { MarkType } from "@/types/mock-types";

describe("custom events", () => {
  describe("generateRecipientTransferEvent", () => {
    it("Should return an array with the events", () => {
      const options: ICalculateRangeProps = {
        type: "transfer",
        starting_date: "2026-08-12",
        animal_id: "123",
        animal_name: "testing",
        isDonor: true,
        isTransfer: true,
        embryon_days: 5,
      };
      const markType: MarkType = "transfer_range";
      const events = generateRecipientTranferEvent(options, markType);

      expect(Array.isArray(events)).toBe(true);
      expect(events).toHaveLength(2);
    });
  });
});

import { MarkType } from "@/types/mock-types";
import { generateEventsArray } from "../generate-events-array";

describe("generate-events-array", () => {
  it("Should generate the array of natural reproductive events", () => {
    const mockProps = {
      starting_date: "2026-08-12",
      animal_id: "123",
      animal_name: "testing",
      mark_type: "natural_range" as MarkType,
    };

    const eventsArray = generateEventsArray(mockProps);

    expect(eventsArray).toHaveLength(6);
  });

  it("Should generate the array of donant-transfer reproductive events", () => {
    const mockProps = {
      starting_date: "2026-08-12",
      animal_id: "123",
      animal_name: "testing",
      mark_type: "transfer_range" as MarkType,
      isDonor: true,
      isTransfer: true,
    };

    const eventsArray = generateEventsArray(mockProps);

    expect(eventsArray).toHaveLength(2);
  });
});

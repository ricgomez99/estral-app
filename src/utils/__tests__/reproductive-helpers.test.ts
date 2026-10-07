import { addRange } from "../reproductive-helpers";

describe("[reproductive-helpers]", () => {
  describe("addRange", () => {
    it("should return an object with two string dates", () => {
      const mock = {
        starting_date: "2029-08-12",
        min_days: 2,
        max_days: 4,
      };

      const { minDate, maxDate } = addRange(
        mock.starting_date,
        mock.min_days,
        mock.max_days,
      );

      expect(minDate).toBe("2029-08-14");
      expect(maxDate).toBe("2029-08-16");
    });
  });
});

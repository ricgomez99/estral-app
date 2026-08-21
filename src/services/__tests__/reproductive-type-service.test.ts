import { ReproductiveRangeFactory } from "../ranges/reproductive-type-service";
import { generateEventsArray } from "@/helpers/generate-events-array";
import { addRange } from "@/utils/reproductive-helpers";
import { DateService } from "@/lib/date-fns/dates";
import { ICalculateRangeProps } from "@/types/reproductive-calculation-types";

// 1. Mocks de helpers y servicios externos
jest.mock("@/helpers/generate-events-array", () => ({
  generateEventsArray: jest.fn(),
}));

jest.mock("@/utils/reproductive-helpers", () => ({
  addRange: jest.fn(),
}));

jest.mock("@/lib/date-fns/dates", () => ({
  DateService: {
    addDaysToDate: jest.fn(),
    formatToStoredDate: jest.fn(),
  },
}));

// Mock constante de hitos para la transferencia
jest.mock("@/utils/consts", () => {
  const originalModule = jest.requireActual("@/utils/consts");
  return {
    ...originalModule,
    REPRODUCTIVE_MILESTONES_RECEPTOR_TRANSFER: {
      check: {
        event_type: "pregnancy_check",
        title: "Pregnancy Check",
        description: "Verify pregnancy",
        min_days: 14,
        max_days: 16,
      },
    },
  };
});

describe("ReproductiveRangeFactory", () => {
  const mockOptions: ICalculateRangeProps = {
    type: "natural" as const,
    starting_date: "2026-08-20",
    animal_id: "animal-123",
    animal_name: "Luna",
    isDonor: false,
    isTransfer: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createRange - Selección de Estrategias", () => {
    it("debe instanciar correctamente la calculadora para un tipo válido", () => {
      const calculator = ReproductiveRangeFactory.createRange("natural");
      expect(calculator).toBeDefined();
      expect(typeof calculator.calculateRange).toBe("function");
    });

    it("debe lanzar un error si se solicita un tipo no registrado", () => {
      expect(() =>
        ReproductiveRangeFactory.createRange("invalid_type" as any),
      ).toThrow("Unregistered type: invalid_type");
    });
  });

  describe("Estrategias Estándar (Natural e Inseminación)", () => {
    it("debe procesar un rango Natural con la marca y condición correspondientes", () => {
      const mockEvents = [{ id: 1, event_type: "check" }];
      (generateEventsArray as jest.Mock).mockReturnValue(mockEvents);

      const calculator = ReproductiveRangeFactory.createRange("natural");
      const result = calculator.calculateRange(mockOptions);

      expect(result.suggestedCondition).toBe("Pregnant");
      expect(result.eventsToCreate).toEqual(mockEvents);
      expect(generateEventsArray).toHaveBeenCalledWith({
        starting_date: "2026-08-20",
        animal_id: "animal-123",
        animal_name: "Luna",
        mark_type: "natural_range",
        isDonor: false,
        isTransfer: false,
      });
    });

    it("debe usar defaultMark de Inseminación ('insemination_range')", () => {
      const calculator = ReproductiveRangeFactory.createRange("insemination");
      calculator.calculateRange({ ...mockOptions, type: "insemination" });

      expect(generateEventsArray).toHaveBeenCalledWith(
        expect.objectContaining({
          mark_type: "insemination_range",
        }),
      );
    });

    it("debe asignar 'donant_transfer_range' y condición 'Open' cuando es Donante en Transferencia", () => {
      const calculator = ReproductiveRangeFactory.createRange("natural");
      const result = calculator.calculateRange({
        ...mockOptions,
        isDonor: true,
        isTransfer: true,
      });

      expect(result.suggestedCondition).toBe("Open");
      expect(generateEventsArray).toHaveBeenCalledWith(
        expect.objectContaining({
          mark_type: "donant_transfer_range",
        }),
      );
    });

    it("debe lanzar error si la estrategia no coincide con el tipo pasado a calculateRange", () => {
      const calculator = ReproductiveRangeFactory.createRange("natural");
      expect(() =>
        calculator.calculateRange({ ...mockOptions, type: "insemination" }),
      ).toThrow(
        "Mismatch reproduction type. Expected: natural, got: insemination",
      );
    });
  });

  describe("Estrategia Personalizada (Transferencia de Receptora)", () => {
    const mockCustomEventProps: ICalculateRangeProps = {
      type: "natural" as const,
      starting_date: "2026-08-20",
      animal_id: "animal-123",
      animal_name: "Luna",
      isDonor: false,
      isTransfer: true,
    };
    it("debe ejecutar la función custom de transferencia y ajustar la fecha ancla según los días del embrión", () => {
      const mockAdjustedDate = new Date("2026-08-13");
      const mockFormattedAnchor = "2026-08-13";

      (DateService.addDaysToDate as jest.Mock).mockReturnValue(
        mockAdjustedDate,
      );
      (DateService.formatToStoredDate as jest.Mock).mockReturnValue(
        mockFormattedAnchor,
      );
      (addRange as jest.Mock).mockReturnValue({
        minDate: "2026-08-27",
        maxDate: "2026-08-29",
      });

      const calculator = ReproductiveRangeFactory.createRange("transfer");
      const result = calculator.calculateRange({
        ...mockCustomEventProps,
        type: "transfer",
        embryon_days: 7,
      });

      // No debe llamar al helper genérico
      expect(generateEventsArray).not.toHaveBeenCalled();

      // Verifica el ajuste de la fecha restando los días del embrión (-7)
      expect(DateService.addDaysToDate).toHaveBeenCalledWith("2026-08-20", -7);
      expect(addRange).toHaveBeenCalledWith(mockFormattedAnchor, 14, 16);

      expect(result.suggestedCondition).toBe("Pregnant");
      expect(result.eventsToCreate).toEqual([
        {
          animal_id: "animal-123",
          animal_name: "Luna",
          event_type: "pregnancy_check",
          mark_type: "transfer_range",
          title: "Pregnancy Check",
          description: "Verify pregnancy",
          min_date: "2026-08-27",
          max_date: "2026-08-29",
          completed: false,
        },
      ]);
    });

    it("debe lanzar un error si la fecha ajustada resultante es inválida", () => {
      (DateService.addDaysToDate as jest.Mock).mockReturnValue(new Date());
      (DateService.formatToStoredDate as jest.Mock).mockReturnValue(null);

      const calculator = ReproductiveRangeFactory.createRange("transfer");

      expect(() =>
        calculator.calculateRange({
          ...mockOptions,
          type: "transfer",
          starting_date: "invalid-date",
        }),
      ).toThrow("Invalid starting_date provided: invalid-date");
    });
  });
});

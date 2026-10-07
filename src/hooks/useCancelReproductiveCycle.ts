import { useQueryClient, useMutation } from "@tanstack/react-query";
import cancelCycleService from "@/services/ranges/cancel-cycle-service";

interface ICancelCycleVariables {
  cycleId: string;
  animalId: string;
  reason: string;
}

export default function useCancelReproductiveCycle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ cycleId, animalId, reason }: ICancelCycleVariables) =>
      cancelCycleService({ cycleId, animalId, reason }),
    onSuccess: (_, variables) => {
      const { animalId } = variables;

      queryClient.invalidateQueries({
        queryKey: ["animal", animalId],
      });

      queryClient.invalidateQueries({
        queryKey: ["animals"],
      });

      queryClient.invalidateQueries({
        queryKey: ["animal-ranges"],
      });

      queryClient.invalidateQueries({
        queryKey: ["calendar-events"],
      });
    },
    onError: (error, variables) => {
      const { cycleId } = variables;
      console.error(
        `Error while cancelling reproductive cycle ${cycleId}\n`,
        error,
      );
    },
  });
}

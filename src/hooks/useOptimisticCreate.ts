import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@tanstack/react-query";

interface IHookProps<TItem, TResponse = any> {
  queryKey: QueryKey;
  mutateFn: (item: TItem) => Promise<TResponse>;
}

export default function useOptimisticCreate<TItem, TResponse = any>({
  queryKey,
  mutateFn,
}: IHookProps<TItem, TResponse>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutateFn,
    onMutate: async (item) => {
      // Cancel outgoing refetches to don't overwrite optimistic update
      await queryClient.cancelQueries({ queryKey });

      // Snapshot previous cache
      const previousData = queryClient.getQueryData<TItem[]>(queryKey);

      // Optimistically update cache with the new item
      queryClient.setQueryData<TItem[]>(queryKey, (oldData) => {
        return oldData ? [...oldData, item] : [item];
      });

      return { previousData };
    },
    onError: (err, item, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

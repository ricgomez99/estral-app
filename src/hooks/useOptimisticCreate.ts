import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QueryKey } from "@tanstack/react-query";

interface IHookProps<TData, TItem, TResponse = any> {
  queryKey: QueryKey;
  mutateFn: (item: TItem) => Promise<TResponse>;
  updateFn?: (oldData: TData | undefined, newItem: TItem) => TData;
}

export default function useOptimisticCreate<
  TItem,
  TData = TItem[],
  TResponse = any,
>({ queryKey, mutateFn, updateFn }: IHookProps<TData, TItem, TResponse>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutateFn,
    onMutate: async (item) => {
      // Cancel outgoing refetches to don't overwrite optimistic update
      await queryClient.cancelQueries({ queryKey });

      // Snapshot previous cache
      const previousData = queryClient.getQueryData<TData>(queryKey);

      // Optimistically update cache with the new item
      queryClient.setQueryData<TData>(queryKey, (oldData) => {
        if (updateFn) return updateFn(oldData, item);
        const currentArray = (oldData as TItem[]) ?? [];
        return [...currentArray, item] as unknown as TData;
      });

      return { previousData };
    },
    onError: (err, item, context) => {
      if (context?.previousData) {
        queryClient.setQueryData<TData>(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

import {
  useQueryClient,
  useMutation,
  type QueryKey,
} from "@tanstack/react-query";

interface IHookProps<TItem extends { id: string | number }, TResponse = any> {
  queryKey: QueryKey;
  mutateFn: (item: TItem) => Promise<TResponse>;
}

export default function useGenericUpdate<
  TItem extends { id: string | number },
  TResponse = any,
>({ queryKey, mutateFn }: IHookProps<TItem, TResponse>) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mutateFn,
    onMutate: async (updatedItem) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<TItem[]>(queryKey);
      queryClient.setQueryData<TItem[]>(queryKey, (oldData) => {
        if (!oldData) return [];

        return oldData.map((item) =>
          item.id === updatedItem.id ? { ...item, ...updatedItem } : item,
        );
      });

      return { previousData };
    },

    onError: (err, updatedItem, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  });
}

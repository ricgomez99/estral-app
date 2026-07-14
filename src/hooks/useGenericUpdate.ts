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
      const previousData = queryClient.getQueryData<
        TItem[] | Record<string, unknown>
      >(queryKey);
      queryClient.setQueryData<TItem[] | Record<string, unknown>>(
        queryKey,
        (oldData) => {
          if (!oldData || !Array.isArray(oldData)) return oldData;

          return oldData.map((item) =>
            item.id === updatedItem.id ? { ...item, ...updatedItem } : item,
          );
        },
      );

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

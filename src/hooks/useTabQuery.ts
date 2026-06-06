import {
  UseQueryOptions,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function useTabQuery<
  TQueryFnData,
  TError = Error,
  TData = TQueryFnData,
>(
  options: UseQueryOptions<TQueryFnData, TError, TData>,
): UseQueryResult<TData, TError> {
  const queryResult = useQuery(options);
  const { refetch } = queryResult;

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  return queryResult;
}

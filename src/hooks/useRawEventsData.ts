import { IReproductiveEvent } from "@/types/mock-types";
import useTabQuery from "./useTabQuery";
import { getReproductiveEvents } from "@/lib/supabase-data-management/data-fetching";
import { useAuthStore } from "@/stores";

export default function useRawEventsData() {
  const { session } = useAuthStore();
  const userId = session?.user?.id;
  const {
    data: events,
    isLoading,
    error,
    isRefetching,
    refetch,
  } = useTabQuery<IReproductiveEvent[]>({
    queryKey: ["reproductive_events", userId],
    queryFn: () => {
      if (!userId) return Promise.resolve([]);
      return getReproductiveEvents(userId);
    },
    enabled: !!userId,
  });

  return { events, isLoading, error, isRefetching, refetch };
}

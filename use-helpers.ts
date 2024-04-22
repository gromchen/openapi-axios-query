import {
  InvalidateOptions,
  InvalidateQueryFilters,
  QueryClient,
  QueryFilters,
  SetDataOptions,
  Updater,
  useQueryClient,
} from "@tanstack/react-query";
import { useCallback, useMemo } from "react";

export function createTypedUseQueryHelpers<TPaths extends object>({
  context,
}: {
  context: QueryClient;
}) {
  function useTypedQueryHelpers() {
    const queryClient = useQueryClient(context);

    const invalidateQueries = useCallback(
      (
        filters?: TypedInvalidateQueryFilters<TPaths>,
        options?: InvalidateOptions | undefined
      ) => queryClient.invalidateQueries(filters, options),
      [queryClient]
    );

    const removeQueries = useCallback(
      (filters?: TypedQueryFilters<TPaths>) =>
        queryClient.removeQueries(filters),
      [queryClient]
    );

    const setQueryData = useCallback(
      <TData>(
        queryKey: TypedQueryKey<TPaths>,
        updater: Updater<TData | undefined, TData | undefined>,
        options?: SetDataOptions
      ) => queryClient.setQueryData(queryKey, updater, options),
      [queryClient]
    );

    return useMemo(
      () => ({
        invalidateQueries,
        removeQueries,
        setQueryData,
      }),
      [invalidateQueries, removeQueries, setQueryData]
    );
  }

  return useTypedQueryHelpers;
}

type TypedInvalidateQueryFilters<TPaths> = Omit<
  InvalidateQueryFilters,
  "queryKey"
> & {
  queryKey?: TypedQueryKey<TPaths>;
};

type TypedQueryFilters<TPaths> = Omit<QueryFilters, "queryKey"> & {
  queryKey?: TypedQueryKey<TPaths>;
};

type TypedQueryKey<TPaths> = ReadonlyArray<keyof TPaths>;

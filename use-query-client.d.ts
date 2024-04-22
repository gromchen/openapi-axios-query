import { InvalidateOptions, InvalidateQueryFilters, QueryClient, QueryFilters, SetDataOptions, Updater } from "@tanstack/react-query";
export declare function createTypedUseQueryClient<TPaths extends object>({ context, }: {
    context: QueryClient;
}): () => {
    invalidateQueries: (filters?: TypedInvalidateQueryFilters<TPaths>, options?: InvalidateOptions | undefined) => Promise<void>;
    removeQueries: (filters?: TypedQueryFilters<TPaths>) => void;
    setQueryData: <TData>(queryKey: TypedQueryKey<TPaths>, updater: Updater<TData | undefined, TData | undefined>, options?: SetDataOptions) => unknown;
};
type TypedInvalidateQueryFilters<TPaths> = Omit<InvalidateQueryFilters, "queryKey"> & {
    queryKey?: TypedQueryKey<TPaths>;
};
type TypedQueryFilters<TPaths> = Omit<QueryFilters, "queryKey"> & {
    queryKey?: TypedQueryKey<TPaths>;
};
type TypedQueryKey<TPaths> = ReadonlyArray<keyof TPaths>;
export {};

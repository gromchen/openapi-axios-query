import { Context } from "react";
import { QueryClient, UseQueryOptions, QueryFilters, Updater, SetDataOptions, InvalidateQueryFilters, InvalidateOptions } from "@tanstack/react-query";
import { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";
export declare function createClient<TPaths extends object>({ baseURL, axios, context, }: {
    baseURL: string;
    axios: AxiosInstance;
    context: Context<QueryClient | undefined>;
}): (<TPath extends keyof TPaths, TMethod extends keyof TPaths[TPath] & HttpMethod>(path: TPath, { method, parameters, data }: Options<TPaths[TPath], TMethod>, config?: TypedAxiosRequestConfig) => Promise<import("axios").AxiosResponse<ResponseData<TPaths[TPath][TMethod]>, any>>) & {
    useQuery: <TPath_1 extends keyof TPaths, TMethod_1 extends keyof TPaths[TPath_1] & HttpMethod, TError = AxiosError<unknown, any>, TData = ResponseData<TPaths[TPath_1][TMethod_1]>>({ url, options, axiosConfig, ...queryOptions }: Omit<UseQueryOptions<ResponseData<TPaths[TPath_1][TMethod_1]>, TError, TData, (TPath_1 | Record<string, any> | undefined)[]>, "queryKey" | "queryFn"> & {
        url: TPath_1;
        options: Options<TPaths[TPath_1], TMethod_1>;
        axiosConfig?: TypedAxiosRequestConfig | undefined;
    }) => {
        invalidateQueries: (filters?: InvalidateQueryFilters<unknown> | undefined, options?: InvalidateOptions | undefined) => Promise<void>;
        removeQueries: (filters?: QueryFilters | undefined) => void;
        setQueryData: (updater: Updater<TData | undefined, TData | undefined>, options?: SetDataOptions | undefined) => TData | undefined;
        data: TData;
        error: TError;
        isError: true;
        isLoading: false;
        isLoadingError: false;
        isRefetchError: true;
        isSuccess: false;
        status: "error";
        dataUpdatedAt: number;
        errorUpdatedAt: number;
        failureCount: number;
        failureReason: TError | null;
        errorUpdateCount: number;
        isFetched: boolean;
        isFetchedAfterMount: boolean;
        isFetching: boolean;
        isInitialLoading: boolean;
        isPaused: boolean;
        isPlaceholderData: boolean;
        isPreviousData: boolean;
        isRefetching: boolean;
        isStale: boolean;
        refetch: <TPageData>(options?: (import("@tanstack/react-query").RefetchOptions & import("@tanstack/react-query").RefetchQueryFilters<TPageData>) | undefined) => Promise<import("@tanstack/react-query").QueryObserverResult<TData, TError>>;
        remove: () => void;
        fetchStatus: import("@tanstack/react-query").FetchStatus;
    } | {
        invalidateQueries: (filters?: InvalidateQueryFilters<unknown> | undefined, options?: InvalidateOptions | undefined) => Promise<void>;
        removeQueries: (filters?: QueryFilters | undefined) => void;
        setQueryData: (updater: Updater<TData | undefined, TData | undefined>, options?: SetDataOptions | undefined) => TData | undefined;
        data: TData;
        error: null;
        isError: false;
        isLoading: false;
        isLoadingError: false;
        isRefetchError: false;
        isSuccess: true;
        status: "success";
        dataUpdatedAt: number;
        errorUpdatedAt: number;
        failureCount: number;
        failureReason: TError | null;
        errorUpdateCount: number;
        isFetched: boolean;
        isFetchedAfterMount: boolean;
        isFetching: boolean;
        isInitialLoading: boolean;
        isPaused: boolean;
        isPlaceholderData: boolean;
        isPreviousData: boolean;
        isRefetching: boolean;
        isStale: boolean;
        refetch: <TPageData>(options?: (import("@tanstack/react-query").RefetchOptions & import("@tanstack/react-query").RefetchQueryFilters<TPageData>) | undefined) => Promise<import("@tanstack/react-query").QueryObserverResult<TData, TError>>;
        remove: () => void;
        fetchStatus: import("@tanstack/react-query").FetchStatus;
    } | {
        invalidateQueries: (filters?: InvalidateQueryFilters<unknown> | undefined, options?: InvalidateOptions | undefined) => Promise<void>;
        removeQueries: (filters?: QueryFilters | undefined) => void;
        setQueryData: (updater: Updater<TData | undefined, TData | undefined>, options?: SetDataOptions | undefined) => TData | undefined;
        data: undefined;
        error: TError;
        isError: true;
        isLoading: false;
        isLoadingError: true;
        isRefetchError: false;
        isSuccess: false;
        status: "error";
        dataUpdatedAt: number;
        errorUpdatedAt: number;
        failureCount: number;
        failureReason: TError | null;
        errorUpdateCount: number;
        isFetched: boolean;
        isFetchedAfterMount: boolean;
        isFetching: boolean;
        isInitialLoading: boolean;
        isPaused: boolean;
        isPlaceholderData: boolean;
        isPreviousData: boolean;
        isRefetching: boolean;
        isStale: boolean;
        refetch: <TPageData>(options?: (import("@tanstack/react-query").RefetchOptions & import("@tanstack/react-query").RefetchQueryFilters<TPageData>) | undefined) => Promise<import("@tanstack/react-query").QueryObserverResult<TData, TError>>;
        remove: () => void;
        fetchStatus: import("@tanstack/react-query").FetchStatus;
    } | {
        invalidateQueries: (filters?: InvalidateQueryFilters<unknown> | undefined, options?: InvalidateOptions | undefined) => Promise<void>;
        removeQueries: (filters?: QueryFilters | undefined) => void;
        setQueryData: (updater: Updater<TData | undefined, TData | undefined>, options?: SetDataOptions | undefined) => TData | undefined;
        data: undefined;
        error: null;
        isError: false;
        isLoading: true;
        isLoadingError: false;
        isRefetchError: false;
        isSuccess: false;
        status: "loading";
        dataUpdatedAt: number;
        errorUpdatedAt: number;
        failureCount: number;
        failureReason: TError | null;
        errorUpdateCount: number;
        isFetched: boolean;
        isFetchedAfterMount: boolean;
        isFetching: boolean;
        isInitialLoading: boolean;
        isPaused: boolean;
        isPlaceholderData: boolean;
        isPreviousData: boolean;
        isRefetching: boolean;
        isStale: boolean;
        refetch: <TPageData>(options?: (import("@tanstack/react-query").RefetchOptions & import("@tanstack/react-query").RefetchQueryFilters<TPageData>) | undefined) => Promise<import("@tanstack/react-query").QueryObserverResult<TData, TError>>;
        remove: () => void;
        fetchStatus: import("@tanstack/react-query").FetchStatus;
    };
};
type TypedAxiosRequestConfig = Omit<AxiosRequestConfig, "url" | "method" | "baseURL" | "params" | "data">;
export type HttpMethod = "get" | "put" | "post" | "delete" | "options" | "head" | "patch" | "trace";
export type Options<TOperations, TMethod extends keyof TOperations> = Operation<TOperations[TMethod]> & RequestBody<TOperations[TMethod]> & HttpObject<TMethod>;
type HttpObject<TMethod> = TMethod extends "get" ? {
    method?: TMethod;
} : {
    method: TMethod;
};
type Operation<TOperation> = TOperation extends {
    parameters: Parameters;
} ? {
    parameters: NonNullable<TOperation["parameters"]>;
} : {
    parameters?: undefined;
};
type Parameters = {
    path?: Record<string, any>;
    query?: Record<string, any>;
};
type RequestBody<TOperation> = {
    data?: RequestBodyMedia<TOperation>;
};
type RequestBodyMedia<TOperation> = FilterKeys<RequestBodyContent<TOperation>, MediaType> extends never ? FilterKeys<NonNullable<RequestBodyContent<TOperation>>, MediaType> | undefined : FilterKeys<RequestBodyContent<TOperation>, MediaType>;
type FilterKeys<Obj, Matchers> = {
    [K in keyof Obj]: K extends Matchers ? Obj[K] : never;
}[keyof Obj];
type RequestBodyContent<TOperation> = FilterKeys<RequestBodyObj<TOperation>, "content">;
type MediaType = `${string}/${string}`;
type RequestBodyObj<T> = T extends {
    requestBody?: any;
} ? T["requestBody"] : never;
type ResponseData<TOperation> = TOperation extends {
    responses: any;
} ? NonNullable<FilterKeys<Success<TOperation["responses"]>, MediaType>> : unknown;
type Success<T> = FilterKeys<FilterKeys<T, OkStatus>, "content">;
export type OkStatus = 200 | 201 | 202 | 203 | 204 | 206 | 207;
export {};

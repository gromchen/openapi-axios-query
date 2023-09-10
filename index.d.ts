import { QueryMeta } from "@tanstack/react-query";
import { AxiosError } from "axios";
export declare function createClient<TPaths extends object>({ baseURL, }: {
    baseURL: string;
}): (<TPath extends keyof TPaths, TMethod extends keyof TPaths[TPath] & HttpMethod>(path: TPath, { method, parameters, data }: Options<TPaths[TPath], TMethod>) => Promise<import("axios").AxiosResponse<ResponseData<TPaths[TPath][TMethod]>, any>>) & {
    useQuery: <TPath_1 extends keyof TPaths, TMethod_1 extends keyof TPaths[TPath_1] & HttpMethod, TError = AxiosError<unknown, any>>({ url, options, refetchOnWindowFocus, keepPreviousData, enabled, refetchInterval, meta, retry, onError, }: {
        url: TPath_1;
        options: Options<TPaths[TPath_1], TMethod_1>;
        refetchOnWindowFocus?: boolean | undefined;
        keepPreviousData?: boolean | undefined;
        enabled?: boolean | undefined;
        refetchInterval?: number | false | undefined;
        meta?: QueryMeta | undefined;
        retry?: number | boolean | ((failureCount: number, error: TError) => boolean) | undefined;
        /** @deprecated https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose */
        onError?: ((err: TError) => void) | undefined;
    }) => {
        queryKey: (TPath_1 | Record<string, any> | undefined)[];
        invalidateQueries: () => Promise<void>;
        data: ResponseData<TPaths[TPath_1][TMethod_1]>;
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
        refetch: <TPageData>(options?: (import("@tanstack/react-query").RefetchOptions & import("@tanstack/react-query").RefetchQueryFilters<TPageData>) | undefined) => Promise<import("@tanstack/react-query").QueryObserverResult<ResponseData<TPaths[TPath_1][TMethod_1]>, TError>>;
        remove: () => void;
        fetchStatus: import("@tanstack/react-query").FetchStatus;
    } | {
        queryKey: (TPath_1 | Record<string, any> | undefined)[];
        invalidateQueries: () => Promise<void>;
        data: ResponseData<TPaths[TPath_1][TMethod_1]>;
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
        refetch: <TPageData>(options?: (import("@tanstack/react-query").RefetchOptions & import("@tanstack/react-query").RefetchQueryFilters<TPageData>) | undefined) => Promise<import("@tanstack/react-query").QueryObserverResult<ResponseData<TPaths[TPath_1][TMethod_1]>, TError>>;
        remove: () => void;
        fetchStatus: import("@tanstack/react-query").FetchStatus;
    } | {
        queryKey: (TPath_1 | Record<string, any> | undefined)[];
        invalidateQueries: () => Promise<void>;
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
        refetch: <TPageData>(options?: (import("@tanstack/react-query").RefetchOptions & import("@tanstack/react-query").RefetchQueryFilters<TPageData>) | undefined) => Promise<import("@tanstack/react-query").QueryObserverResult<ResponseData<TPaths[TPath_1][TMethod_1]>, TError>>;
        remove: () => void;
        fetchStatus: import("@tanstack/react-query").FetchStatus;
    } | {
        queryKey: (TPath_1 | Record<string, any> | undefined)[];
        invalidateQueries: () => Promise<void>;
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
        refetch: <TPageData>(options?: (import("@tanstack/react-query").RefetchOptions & import("@tanstack/react-query").RefetchQueryFilters<TPageData>) | undefined) => Promise<import("@tanstack/react-query").QueryObserverResult<ResponseData<TPaths[TPath_1][TMethod_1]>, TError>>;
        remove: () => void;
        fetchStatus: import("@tanstack/react-query").FetchStatus;
    };
};
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

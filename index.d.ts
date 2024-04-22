import { QueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
export declare function createClient<TPaths extends object>({ baseURL, axios, context, }: {
    baseURL: string;
    axios: AxiosInstance;
    context: QueryClient;
}): {
    axios: <TPath extends keyof TPaths, TMethod extends keyof TPaths[TPath] & import("./http").HttpMethod>(path: TPath, { method, parameters, data }: import("./http").Options<TPaths[TPath], TMethod>, config?: import("./axios").TypedAxiosRequestConfig) => Promise<import("axios").AxiosResponse<import("./axios").ResponseData<TPaths[TPath][TMethod]>, any>>;
    useQuery: <TPath_1 extends keyof TPaths, TMethod_1 extends keyof TPaths[TPath_1] & import("./http").HttpMethod, TError = import("axios").AxiosError<unknown, any>, TData = import("./axios").ResponseData<TPaths[TPath_1][TMethod_1]>>({ url, options, axiosConfig, ...queryOptions }: Omit<import("@tanstack/react-query").UseQueryOptions<import("./axios").ResponseData<TPaths[TPath_1][TMethod_1]>, TError, TData, (Record<string, any> | TPath_1 | undefined)[]>, "queryKey" | "queryFn"> & {
        url: TPath_1;
        options: import("./http").Options<TPaths[TPath_1], TMethod_1>;
        axiosConfig?: import("./axios").TypedAxiosRequestConfig | undefined;
    }) => import("@tanstack/react-query").UseQueryResult<TData, TError>;
    useQueryClient: () => {
        invalidateQueries: (filters?: (Omit<import("@tanstack/react-query").InvalidateQueryFilters, "queryKey"> & {
            queryKey?: readonly (keyof TPaths)[] | undefined;
        }) | undefined, options?: import("@tanstack/react-query").InvalidateOptions | undefined) => Promise<void>;
        removeQueries: (filters?: (Omit<import("@tanstack/react-query").QueryFilters, "queryKey"> & {
            queryKey?: readonly (keyof TPaths)[] | undefined;
        }) | undefined) => void;
        setQueryData: <TData_1>(queryKey: readonly (keyof TPaths)[], updater: import("@tanstack/react-query").Updater<TData_1 | undefined, TData_1 | undefined>, options?: import("@tanstack/react-query").SetDataOptions | undefined) => unknown;
    };
};

import { QueryClient, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { HttpMethod, Options } from "./http";
import { ResponseData, TypedAxios, TypedAxiosRequestConfig } from "./axios";
export declare function createTypedUseQuery<TPaths extends object>({ typedAxios, context, }: {
    typedAxios: TypedAxios<TPaths>;
    context: QueryClient;
}): <TPath extends keyof TPaths, TMethod extends keyof TPaths[TPath] & HttpMethod, TError = AxiosError<unknown, any>, TData = ResponseData<TPaths[TPath][TMethod]>>({ url, options, axiosConfig, ...queryOptions }: Omit<UseQueryOptions<ResponseData<TPaths[TPath][TMethod]>, TError, TData, (Record<string, any> | TPath | undefined)[]>, "queryKey" | "queryFn"> & {
    url: TPath;
    options: Options<TPaths[TPath], TMethod>;
    axiosConfig?: TypedAxiosRequestConfig;
}) => import("@tanstack/react-query").UseQueryResult<TData, TError>;

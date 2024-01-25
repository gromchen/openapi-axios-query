import {useCallback, useMemo} from "react";
import {
  useQuery,
  QueryClient,
  useQueryClient,
  UseQueryOptions,
  QueryFilters,
  Updater,
  SetDataOptions,
  InvalidateQueryFilters,
  InvalidateOptions,
} from "@tanstack/react-query";
import { AxiosInstance, AxiosError, AxiosRequestConfig } from "axios";

export function createClient<TPaths extends object>({
  baseURL,
  axios,
  context,
}: {
  baseURL: string;
  axios: AxiosInstance;
  context: QueryClient;
}) {
    const typedAxios = <
    TPath extends keyof TPaths,
    TMethod extends keyof TPaths[TPath] & HttpMethod
  >(
    path: TPath,
    { method, parameters, data }: Options<TPaths[TPath], TMethod>,
    config: TypedAxiosRequestConfig = {}
  ) =>
    axios<ResponseData<TPaths[TPath][TMethod]>>({
      url: toUrl(path, parameters?.path),
      method,
      baseURL,
      params: parameters?.query,
      data,
      ...config,
    });

  const useTypedQuery = <
    TPath extends keyof TPaths,
    TMethod extends keyof TPaths[TPath] & HttpMethod,
    TError = AxiosError,
    TData = ResponseData<TPaths[TPath][TMethod]>
  >({
    url,
    options,
    axiosConfig,
    ...queryOptions
  }: Omit<
    UseQueryOptions<
      ResponseData<TPaths[TPath][TMethod]>,
      TError,
      TData,
      (Record<string, any> | TPath | undefined)[]
    >,
    "queryKey" | "queryFn"
  > & {
    url: TPath;
    options: Options<TPaths[TPath], TMethod>;
    axiosConfig?: TypedAxiosRequestConfig;
  }) => {
    const queryClient = useQueryClient( context );
    const queryKey = useMemo(
      () => [url, options.parameters?.path, options.parameters?.query],
      [options.parameters?.path, options.parameters?.query, url]
    );

    const result = useQuery({
      queryKey,
      queryFn: async () => (await typedAxios(url, options, axiosConfig)).data,
      ...queryOptions,
    }, queryClient);

    const invalidateQueries = useCallback(
      (
        filters?: InvalidateQueryFilters | undefined,
        options?: InvalidateOptions | undefined
      ) => queryClient.invalidateQueries({queryKey, ...filters}, options),
      [queryClient, queryKey]
    );

    const removeQueries = useCallback(
      (filters?: QueryFilters | undefined) =>
        queryClient.removeQueries({queryKey, ...filters}),
      [queryClient, queryKey]
    );

    const setQueryData = useCallback(
      (
        updater: Updater<TData | undefined, TData | undefined>,
        options?: SetDataOptions | undefined
      ) => queryClient.setQueryData(queryKey, updater, options),
      [queryClient, queryKey]
    );

    return {
      ...result,
      invalidateQueries,
      removeQueries,
      setQueryData,
    };
  };

  return Object.assign(typedAxios, {
    useQuery: useTypedQuery,
  });
}

/** @todo use reduce */
function toUrl(
  path: string | number | symbol,
  query: Record<string, unknown> | undefined
) {
  let url = String(path);

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      url = url.replace(`{${key}}`, encodeURIComponent(String(value)));
    }
  }

  return url;
}

type TypedAxiosRequestConfig = Omit<AxiosRequestConfig, "url" | "method" | "baseURL" | "params" | "data">;

export type HttpMethod =
  | "get"
  | "put"
  | "post"
  | "delete"
  | "options"
  | "head"
  | "patch"
  | "trace";

export type Options<TOperations, TMethod extends keyof TOperations> = Operation<
  TOperations[TMethod]
> &
  RequestBody<TOperations[TMethod]> &
  HttpObject<TMethod>;

type HttpObject<TMethod> = TMethod extends "get"
  ? { method?: TMethod }
  : { method: TMethod };

type Operation<TOperation> = TOperation extends {
  parameters: Parameters;
}
  ? { parameters: NonNullable<TOperation["parameters"]> }
  : { parameters?: undefined };

type Parameters = {
  path?: Record<string, any>;
  query?: Record<string, any>;
};

type RequestBody<TOperation> = { data?: RequestBodyMedia<TOperation> };

type RequestBodyMedia<TOperation> = FilterKeys<
  RequestBodyContent<TOperation>,
  MediaType
> extends never
  ?
      | FilterKeys<NonNullable<RequestBodyContent<TOperation>>, MediaType>
      | undefined
  : FilterKeys<RequestBodyContent<TOperation>, MediaType>;

type FilterKeys<Obj, Matchers> = {
  [K in keyof Obj]: K extends Matchers ? Obj[K] : never;
}[keyof Obj];

type RequestBodyContent<TOperation> = FilterKeys<
  RequestBodyObj<TOperation>,
  "content"
>;

type MediaType = `${string}/${string}`;

type RequestBodyObj<T> = T extends { requestBody?: any }
  ? T["requestBody"]
  : never;

type ResponseData<TOperation> = TOperation extends { responses: any }
  ? NonNullable<FilterKeys<Success<TOperation["responses"]>, MediaType>>
  : unknown;

type Success<T> = FilterKeys<FilterKeys<T, OkStatus>, "content">;

export type OkStatus = 200 | 201 | 202 | 203 | 204 | 206 | 207;

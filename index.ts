import { Context } from "react";
import {
  QueryMeta,
  useQuery,
  useQueryClient,
  QueryClient,
} from "@tanstack/react-query";
import { AxiosInstance, AxiosError } from "axios";

export function createClient<TPaths extends object>({
  baseURL,
  axios,
  context,
}: {
  baseURL: string;
  axios: AxiosInstance;
  context: Context<QueryClient | undefined>;
}) {
  const typedAxios = <
    TPath extends keyof TPaths,
    TMethod extends keyof TPaths[TPath] & HttpMethod
  >(
    path: TPath,
    { method, parameters, data }: Options<TPaths[TPath], TMethod>
  ) =>
    axios<ResponseData<TPaths[TPath][TMethod]>>({
      url: toUrl(path, parameters?.path),
      method,
      baseURL,
      params: parameters?.query,
      data,
    });

  const useTypedQuery = <
    TPath extends keyof TPaths,
    TMethod extends keyof TPaths[TPath] & HttpMethod,
    TError = AxiosError
  >({
    url,
    options,
    refetchOnWindowFocus,
    keepPreviousData,
    enabled,
    refetchInterval,
    meta,
    retry,
    onError,
  }: {
    url: TPath;
    options: Options<TPaths[TPath], TMethod>;
    refetchOnWindowFocus?: boolean;
    keepPreviousData?: boolean;
    enabled?: boolean;
    refetchInterval?: number | false;
    meta?: QueryMeta;
    retry?:
      | boolean
      | number
      | ((failureCount: number, error: TError) => boolean);

    /** @deprecated https://tkdodo.eu/blog/breaking-react-querys-api-on-purpose */
    onError?: (err: TError) => void;
  }) => {
    const queryClient = useQueryClient({ context });

    const queryKey = [url, options.parameters?.path, options.parameters?.query];

    const result = useQuery({
      queryKey,
      queryFn: async () => (await typedAxios(url, options)).data,
      refetchOnWindowFocus,
      keepPreviousData,
      enabled,
      refetchInterval,
      meta,
      retry,
      onError,
      context,
    });

    return {
      ...result,
      queryKey,
      invalidateQueries: () => queryClient.invalidateQueries(queryKey),
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

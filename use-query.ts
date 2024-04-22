import { useMemo } from "react";
import { QueryClient, useQuery, UseQueryOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { HttpMethod, Options } from "./http";
import { ResponseData, TypedAxios, TypedAxiosRequestConfig } from "./axios";

export function createTypedUseQuery<TPaths extends object>({
  typedAxios,
  context,
}: {
  typedAxios: TypedAxios<TPaths>;
  context: QueryClient;
}) {
  function useTypedQuery<
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
  }) {
    const queryKey = useMemo(() => {
      const keyArray: (TPath | Record<string, any>)[] = [url];

      if (options.parameters) {
        const { path, query } = options.parameters;

        if (path) {
          keyArray.push(path);
        }

        if (query) {
          keyArray.push(query);
        }
      }

      return keyArray;
    }, [options.parameters, url]);

    return useQuery(
      {
        queryKey,
        queryFn: async () => (await typedAxios(url, options, axiosConfig)).data,
        ...queryOptions,
      },
      context
    );
  }

  return useTypedQuery;
}

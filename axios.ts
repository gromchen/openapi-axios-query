import { AxiosInstance, AxiosRequestConfig } from "axios";
import { FilterKeys, HttpMethod, MediaType, Options, Success } from "./http";

export function createTypedAxios<TPaths extends object>({
  baseURL,
  axios,
}: {
  baseURL: string;
  axios: AxiosInstance;
}) {
  function typedAxios<
    TPath extends keyof TPaths,
    TMethod extends keyof TPaths[TPath] & HttpMethod
  >(
    path: TPath,
    { method, parameters, data }: Options<TPaths[TPath], TMethod>,
    config: TypedAxiosRequestConfig = {}
  ) {
    return axios<ResponseData<TPaths[TPath][TMethod]>>({
      url: toUrl(path, parameters?.path),
      method,
      baseURL,
      params: parameters?.query,
      data,
      ...config,
    });
  }

  return typedAxios;
}

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

export type TypedAxios<TPaths extends object> = ReturnType<
  typeof createTypedAxios<TPaths>
>;

export type TypedAxiosRequestConfig = Omit<
  AxiosRequestConfig,
  "url" | "method" | "baseURL" | "params" | "data"
>;

export type ResponseData<TOperation> = TOperation extends { responses: any }
  ? NonNullable<FilterKeys<Success<TOperation["responses"]>, MediaType>>
  : unknown;

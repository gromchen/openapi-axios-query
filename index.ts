import { QueryClient } from "@tanstack/react-query";
import { AxiosInstance } from "axios";
import { createTypedAxios } from "./axios";
import { createTypedUseQuery } from "./use-query";
import { createTypedUseQueryHelpers } from "./use-helpers";

export function createClient<TPaths extends object>({
  baseURL,
  axios,
  context,
}: {
  baseURL: string;
  axios: AxiosInstance;
  context: QueryClient;
}) {
  const typedAxios = createTypedAxios<TPaths>({ baseURL, axios });

  return {
    axios: typedAxios,
    useQuery: createTypedUseQuery<TPaths>({ typedAxios, context }),
    useQueryHelpers: createTypedUseQueryHelpers<TPaths>({ context }),
  };
}

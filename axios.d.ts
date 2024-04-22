import { AxiosInstance, AxiosRequestConfig } from "axios";
import { FilterKeys, HttpMethod, MediaType, Options, Success } from "./http";
export declare function createTypedAxios<TPaths extends object>({ baseURL, axios, }: {
    baseURL: string;
    axios: AxiosInstance;
}): <TPath extends keyof TPaths, TMethod extends keyof TPaths[TPath] & HttpMethod>(path: TPath, { method, parameters, data }: Options<TPaths[TPath], TMethod>, config?: TypedAxiosRequestConfig) => Promise<import("axios").AxiosResponse<ResponseData<TPaths[TPath][TMethod]>, any>>;
export type TypedAxios<TPaths extends object> = ReturnType<typeof createTypedAxios<TPaths>>;
export type TypedAxiosRequestConfig = Omit<AxiosRequestConfig, "url" | "method" | "baseURL" | "params" | "data">;
export type ResponseData<TOperation> = TOperation extends {
    responses: any;
} ? NonNullable<FilterKeys<Success<TOperation["responses"]>, MediaType>> : unknown;

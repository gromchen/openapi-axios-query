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

type Operation<TOperation> = TOperation extends {
  parameters: Parameters;
}
  ? { parameters: NonNullable<TOperation["parameters"]> }
  : { parameters?: undefined };

type RequestBody<TOperation> = { data?: RequestBodyMedia<TOperation> };

type HttpObject<TMethod> = TMethod extends "get"
  ? { method?: TMethod }
  : { method: TMethod };

type Parameters = {
  path?: Record<string, any>;
  query?: Record<string, any>;
};

type RequestBodyMedia<TOperation> = FilterKeys<
  RequestBodyContent<TOperation>,
  MediaType
> extends never
  ?
      | FilterKeys<NonNullable<RequestBodyContent<TOperation>>, MediaType>
      | undefined
  : FilterKeys<RequestBodyContent<TOperation>, MediaType>;

export type FilterKeys<Obj, Matchers> = {
  [K in keyof Obj]: K extends Matchers ? Obj[K] : never;
}[keyof Obj];

type RequestBodyContent<TOperation> = FilterKeys<
  RequestBodyObj<TOperation>,
  "content"
>;

export type MediaType = `${string}/${string}`;

type RequestBodyObj<T> = T extends { requestBody?: any }
  ? T["requestBody"]
  : never;

export type Success<T> = FilterKeys<FilterKeys<T, OkStatus>, "content">;

export type OkStatus = 200 | 201 | 202 | 203 | 204 | 206 | 207;

export interface RocketApiResponse<T> {
  status: "done" | "error";
  response: ResponseData<T>;
}

export interface ResponseData<T> {
  status_code: number;
  content_type: "application/json";
  body: T;
}

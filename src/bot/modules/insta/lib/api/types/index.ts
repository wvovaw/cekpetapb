export interface RocketApiResponse<T> {
  status: "done" | "error" | "fail";
  response: ResponseData<T>;
}

export type ResponseData<T> = {
  status_code: 200;
  content_type: "application/json";
  body: T;
} | {
  status_code: 400;
  content_type: "application/json";
  body: string;
};

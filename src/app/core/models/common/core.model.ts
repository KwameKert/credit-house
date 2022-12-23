export interface IApiResponse<T> {
  data: T;
  message: string;
}

export interface IApiResponsePage<T> {
  data: {};
}

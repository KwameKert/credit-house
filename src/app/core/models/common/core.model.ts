export interface IApiResponse<T> {
  data: T;
  message: string;
}

export interface IApiResponsePage<T> {
  data: {};
}

export interface SelectModel {
  id?: string | number;
  name?: string;
}

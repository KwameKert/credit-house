export enum HttpProgressState {
  start = 0,
  end = 1,
}

export interface IHttpState {
  url: string;
  state: HttpProgressState;
}

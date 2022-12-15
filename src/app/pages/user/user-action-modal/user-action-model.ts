export interface UserActionModel {
  title: string;
  description: string;
  type: Actiontype;
  data?: any;
}

export enum Actiontype {
  UPDATE,
  CREATE,
}

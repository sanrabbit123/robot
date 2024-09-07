export interface Dictionary {
  [ key: string ]: any;
}

export interface StringDictionary {
  [ key: string ]: string;
}

export type List = Array<any>;

export type StringList = Array<string>;

export type RequestData = Dictionary | List | string;

export type Matrix = Array<any[]>;

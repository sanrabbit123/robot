/**
 * @interface Dictionary
 * @description 문자열 키에 임의의 값(any)을 매핑하는 사전 구조입니다.
 * 이 인터페이스는 문자열을 키로 하고, 해당 키에 임의의 값을 할당할 수 있는 객체 형태를 정의합니다.
 */
export interface Dictionary {
  [key: string]: any; // 키는 문자열이며, 값은 임의의 타입(any)입니다.
}

/**
 * @interface StringDictionary
 * @description 문자열 키에 문자열 값을 매핑하는 사전 구조입니다.
 * 이 인터페이스는 문자열을 키로 하고, 해당 키에 문자열 값을 할당할 수 있는 객체 형태를 정의합니다.
 */
export interface StringDictionary {
  [key: string]: string; // 키는 문자열, 값도 문자열인 사전 구조입니다.
}

/**
 * @typedef List
 * @type {Array<any>}
 * @description 임의의 타입을 요소로 갖는 배열입니다.
 * 이 타입은 다양한 값들을 포함할 수 있는 배열을 정의합니다.
 */
export type List = Array<any>; // 임의의 타입을 요소로 갖는 배열입니다.

/**
 * @typedef StringList
 * @type {Array<string>}
 * @description 문자열만을 요소로 갖는 배열입니다.
 * 이 타입은 오직 문자열만 포함하는 배열을 정의합니다.
 */
export type StringList = Array<string>; // 문자열로만 구성된 배열입니다.

/**
 * @typedef RequestData
 * @type {Dictionary | List | string}
 * @description 요청에 사용할 수 있는 데이터의 타입을 정의합니다.
 * 사전 구조(Dictionary), 리스트(List), 또는 문자열(string) 중 하나의 타입을 가질 수 있습니다.
 */
export type RequestData = Dictionary | List | string; // 요청에 사용할 수 있는 데이터는 사전, 리스트 또는 문자열일 수 있습니다.

/**
 * @typedef Matrix
 * @type {Array<any[]>}
 * @description 다차원 배열로, 배열 내 요소가 배열인 구조를 정의합니다.
 * 이 타입은 행렬 구조를 나타낼 때 사용됩니다.
 */
export type Matrix = Array<any[]>; // 배열 내의 요소가 배열인 다차원 배열입니다.
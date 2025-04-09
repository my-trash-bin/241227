export type RemoveFirst<T extends any[]> = T extends [any, ...infer I]
  ? I
  : never;

export type XOR<T extends any[]> = XORInternal1<
  T,
  XORInternal2<T, never>,
  never
>;

type XORInternal2<T extends any[], A> = T["length"] extends 0
  ? A
  : XORInternal2<RemoveFirst<T>, keyof T[0] | A>;

type XORInternal1<
  T extends any[],
  K extends keyof any,
  A
> = T["length"] extends 0
  ? A
  : XORInternal1<
      RemoveFirst<T>,
      K,
      A | (Partial<Record<Exclude<K, keyof T[0]>, undefined>> & T[0])
    >;

export type StringReplace<
  T extends string,
  F extends string,
  R extends string,
  A extends string = ""
> = T extends `${infer I}${F}${infer J}`
  ? StringReplace<J, F, R, `${A}${I}${R}`>
  : `${A}${T}`;

export type StringJoin<
  T extends string[],
  S extends string,
  A extends string = never
> = T["length"] extends 0
  ? [A] extends [never]
    ? ""
    : A
  : StringJoin<
      RemoveFirst<T>,
      S,
      [A] extends [never] ? T[0] : `${A}${S}${T[0]}`
    >;

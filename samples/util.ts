export type IsSameType<X, Y> = (<T>() => T extends X ? 0 : 1) extends <
  T
>() => T extends Y ? 0 : 1
  ? true
  : false;

export type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;

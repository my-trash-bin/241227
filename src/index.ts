export type Scalars<T> = T extends Record<"scalars", infer I> ? I : never;
export type Objects<T> = T extends Record<"objects", infer I> ? I : never;

export type SelectInput<T> = Readonly<Partial<Record<keyof Scalars<T>, true>>> &
  IncludeInput<T>;
export type IncludeInput<T> = {
  readonly [K in keyof Objects<T>]?: GetInput<
    UnwrapArray<NonNullable<Objects<T>[K]>>
  >;
};
export type GetInput<T> =
  | { select: SelectInput<T> }
  | { include: IncludeInput<T> }
  | true;
type UnwrapArray<T> = T extends (infer I)[] ? I : T;

export type SelectResult<Model, Select extends SelectInput<Model>> = Pick<
  Scalars<Model>,
  Extract<keyof Scalars<Model>, keyof Select>
> &
  IncludeObjectResult<Model, Select>;
export type IncludeResult<
  Model,
  Include extends IncludeInput<Model>
> = Scalars<Model> & IncludeObjectResult<Model, Include>;
type IncludeObjectResult<Model, Include extends IncludeInput<Model>> = {
  [K in Extract<
    keyof Objects<Model>,
    keyof Include
  >]: Include[K] extends GetInput<UnwrapArray<NonNullable<Objects<Model>[K]>>>
    ? WrapNullable<
        WrapArray<
          GetResult<UnwrapArray<NonNullable<Objects<Model>[K]>>, Include[K]>,
          NonNullable<Objects<Model>[K]>
        >,
        Objects<Model>[K]
      >
    : never;
};
export type GetResult<Model, Get extends GetInput<Model>> = Get extends {
  select: infer I extends SelectInput<Model>;
}
  ? SelectResult<Model, I>
  : Get extends { include: infer I extends IncludeInput<Model> }
  ? IncludeResult<Model, I>
  : Scalars<Model>;
type WrapArray<Target, Original> = Original extends any[] ? Target[] : Target;
type WrapNullable<Target, Original> = Original extends NonNullable<Original>
  ? Target
  : Target | undefined;

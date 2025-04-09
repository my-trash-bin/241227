import { RemoveFirst, StringJoin, StringReplace, XOR } from "./util";

type Scalars<T> = T extends Record<"scalars", infer I> ? I : never;
type Objects<T> = T extends Record<"objects", infer I> ? I : never;
type UniqueIndices<T> = T extends Record<"uniqueIndices", infer I> ? I : never;

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

export type UniqueWhere<Model> = XOR<
  UniqueWhereInternal<Model, Extract<UniqueIndices<Model>, any[]>, []>
>;
type UniqueWhereInternal<
  Model,
  Remaining extends any[],
  Processed extends any[]
> = Remaining["length"] extends 0
  ? Processed
  : UniqueWhereInternal<
      Model,
      RemoveFirst<Remaining>,
      [
        ...Processed,
        {
          [K in Extract<
            StringJoin<
              RenameSingleUnderscoreToDoubleUnderscoreInTuple<Remaining[0], []>,
              "_"
            >,
            string
          >]: {
            [K in Remaining[0][number]]: K extends keyof Scalars<Model>
              ? Scalars<Model>[K]
              : K extends keyof Objects<Model>
              ? UniqueWhere<Objects<Model>[K]>
              : "ERROR";
          };
        }
      ]
    >;
type RenameSingleUnderscoreToDoubleUnderscoreInTuple<
  Remaining extends string[],
  Processed extends string[]
> = Remaining extends any // Fix error: Excessive stack depth comparing types
  ? Remaining["length"] extends 0
    ? Processed
    : RenameSingleUnderscoreToDoubleUnderscoreInTuple<
        RemoveFirst<Remaining>,
        [...Processed, StringReplace<Remaining[0], "_", "__">]
      >
  : never;

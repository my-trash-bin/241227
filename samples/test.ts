import { GetInput, GetResult } from "../src";
import { User } from "./models/User";
import { IsSameType } from "./util/IsSmaeType";

declare function User<const T extends GetInput<User>>(_: T): GetResult<User, T>;

const a = User({
  include: {
    comments: { select: { id: true, post: { select: { id: true } } } },
  },
});

declare function assertEqual<A, B>(arg: IsSameType<A, B>): unknown;

assertEqual<
  ExpandRecursively<typeof a>,
  ExpandRecursively<
    User["scalars"] & { comments: { id: string; post: { id: string } }[] }
  >
>(true);

type ExpandRecursively<T> = T extends object
  ? T extends infer O
    ? { [K in keyof O]: ExpandRecursively<O[K]> }
    : never
  : T;

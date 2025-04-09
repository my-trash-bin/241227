import { GetInput, GetResult, UniqueWhere } from "../src";
import { XOR } from "../src/util";
import { Test } from "./models/Test";
import { User } from "./models/User";
import { ExpandRecursively, IsSameType } from "./util";

declare function assertEqual<A, B>(arg: IsSameType<A, B>): unknown;

declare function GetUser<const T extends GetInput<User>>(
  _: T
): GetResult<User, T>;

const a = GetUser({
  include: {
    comments: { select: { id: true, post: { select: { id: true } } } },
  },
});

assertEqual<
  ExpandRecursively<typeof a>,
  ExpandRecursively<
    User["scalars"] & { comments: { id: string; post: { id: string } }[] }
  >
>(true);

assertEqual<
  ExpandRecursively<UniqueWhere<User>>,
  ExpandRecursively<
    XOR<[{ id: { id: string } }, { nickname: { nickname: string } }]>
  >
>(true);

assertEqual<
  ExpandRecursively<UniqueWhere<Test>>,
  ExpandRecursively<
    XOR<[{ id: { id: string } }, { id1_id__2: { id1: string; id_2: number } }]>
  >
>(true);

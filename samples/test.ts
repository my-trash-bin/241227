import { GetInput, GetResult } from "../src";
import { User } from "./models/User";

declare function User<const T extends GetInput<User>>(_: T): GetResult<User, T>;

const a = User({
  include: {
    comments: { select: { id: true, post: { select: { id: true } } } },
  },
});

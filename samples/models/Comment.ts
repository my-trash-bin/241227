import { Post } from "./Post";
import { User } from "./User";

export interface Comment {
  name: "Comment";
  scalars: {
    id: string;
    createTime: Date;
    postId: string;
    authorId: string;
    title: string;
  };
  objects: {
    post: Post;
    author: User;
  };
  uniqueIndices: [["id"]];
  nonUniqueIndices: [["createTime"]];
}

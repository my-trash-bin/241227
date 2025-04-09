import { Comment } from "./Comment";
import { Post } from "./Post";

export interface User {
  name: "User";
  scalars: {
    id: string;
    createTime: Date;
    login: string;
    nickname: string;
    representativePostId?: string;
  };
  objects: {
    posts: Post[];
    representativePost?: Post;
    comments: Comment[];
  };
  uniqueIndices: [["id"], ["nickname"]];
  nonUniqueIndices: [["createTime"]];
}

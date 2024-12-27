import { Post } from "./Post";
import { User } from "./User";

export interface Comment {
  name: "Comment";
  scalars: {
    id: string;
    postId: string;
    authorId: string;
    title: string;
  };
  objects: {
    post: Post;
    author: User;
  };
}

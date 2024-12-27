import { Comment } from "./Comment";
import { Post } from "./Post";

export interface User {
  name: "User";
  scalars: {
    id: string;
    login: string;
    nickname: string;
    representativePostId?: string;
  };
  objects: {
    posts: Post[];
    representativePost?: Post;
    comments: Comment[];
  };
}

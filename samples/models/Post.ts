import { Comment } from "./Comment";
import { User } from "./User";

export interface Post {
  name: "Post";
  scalars: {
    id: string;
    authorId: string;
    title: string;
    content: string;
  };
  objects: {
    author: User;
    comments: Comment[];
    representativePostUser?: User;
  };
}

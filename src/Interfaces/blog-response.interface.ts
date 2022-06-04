import { Blog } from "../Interfaces/blog.interface";

export interface BlogResponse {
  blog: Blog,
  isOwner: boolean,
}
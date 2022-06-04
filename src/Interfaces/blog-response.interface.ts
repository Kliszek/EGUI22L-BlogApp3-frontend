import { Blog } from "./blog.interface";

export interface BlogResponse {
  blog: Blog,
  isOwner: boolean,
}
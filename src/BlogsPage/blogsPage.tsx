import { useEffect } from "react";
import BlogsService from "../services/blogs.service";
import UsersService from "../services/users.service";

export const BlogsPage = () => {

  useEffect(() => {
    const abortCont = new AbortController();
    BlogsService.getAll()
    .then((result) => {
      console.log(result);
    });
  },[])

  return (
    <div>
      BlogsPage
    </div>
  );
}

export default BlogsPage;
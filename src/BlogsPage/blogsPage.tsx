import { useEffect } from "react";
import BlogsService from "../services/blogs.service";

export const BlogsPage = () => {

  useEffect(() => {
    const abortCont = new AbortController();
    BlogsService.getBlogs({signal: abortCont.signal})
    .then((result:any) => {
      console.log(result);
    });

    return ()=>abortCont.abort();
  },[])

  return (
    <div>
      BlogsPage
    </div>
  );
}

export default BlogsPage;
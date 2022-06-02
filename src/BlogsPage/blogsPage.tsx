import { useEffect, useState } from "react";
import BlogsService from "../services/blogs.service";

export const BlogsPage = () => {

  
  const [ isLoading, setIsLoading ] = useState<boolean>(true);

  useEffect(() => {
    const abortCont = new AbortController();
    BlogsService.getBlogs({signal: abortCont.signal})
    .then((result:any) => {
      console.log(result);
      setIsLoading(false);
    });

    return ()=>abortCont.abort();
  },[])

  return (
    <div>
      BlogsPage
      {isLoading && <>Loading...</>}
    </div>
  );
}

export default BlogsPage;
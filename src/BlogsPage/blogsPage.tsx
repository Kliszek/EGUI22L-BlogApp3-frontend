import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Blog } from "../Interfaces/blog.interface";
import BlogsService from "../services/blogs.service";

export const BlogsPage = () => {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState<Blog[] | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const abortCont = new AbortController();
    BlogsService.getBlogs({ signal: abortCont.signal })
      .then((result: Blog[]) => {
        setBlogs(result);
        setIsLoading(false);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          console.log("Could not authorize, redirecting to login page");
          navigate("/users/signin");
          //window.location.href = '/users/signin';
        } else {
          console.log(error);
          //HANDLE THIS LATER!!!
        }
      });

    return () => abortCont.abort();
  }, [navigate]);

  return (
    <div className="vh-100 justify-content-center mt-5">
      {isLoading && <>Loading...</>}
      {blogs &&
        blogs.map((blog) => (
          <div key={blog.id} className="row justify-content-center mb-5">
            <div className="col-10 col-md-8 col-lg-6 col-xl-5 card">
              <div className="card-body">
                <Link to={`/blogs/${blog.id}`}>
                  <h5 className="h4 d-inline-block px-4 py-1 fw-semibold border-1 border-bottom">{blog.title}</h5>
                </Link>
                <p>A blog by: {blog.ownerId}</p>
              </div>
              <div className="card-footer pb-0 mb-0">
                <p>Entries: {blog.blogEntryList.length}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BlogsPage;

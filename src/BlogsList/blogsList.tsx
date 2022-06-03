import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Blog } from "../Interfaces/blog.interface";
import BlogsService from "../services/blogs.service";

export const BlogsList = () => {
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
          navigate("/signin");
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
      <Outlet/>
      {isLoading && <>Loading...</>}
      {blogs &&
        blogs.map((blog) => (
          <div key={blog.id} className="row justify-content-center mb-5">
            <div className="col-10 col-md-8 col-lg-6 col-xl-8 text-start card shadow-sm">
              <div className="card-body m-2">
                <div className="d-flex justify-content-between">
                  <Link to={`/blogs/${blog.id}`}>
                    <h5 className="h3 d-inline-block ps-2 pe-4 py-1 fw-semibold border-1 border-bottom">{blog.title}</h5>
                  </Link>
                  <p>A blog by: {blog.ownerId}</p>
                </div>
                <div className="mt-4 d-flex row justify-content-end">
                  <div className="start col-6">
                    <h5 className="ps-2">
                      Latest entry:
                    </h5>
                    <p className="text-nowrap overflow-hidden text-truncate bg-light rounded-3 p-3 pe-5 shadow-sm">
                    { blog.blogEntryList.length > 0 && blog.blogEntryList[0].content}
                    { blog.blogEntryList.length === 0 && <>This blog has no entries yet.</> }
                    </p>
                  </div>
                  <div className="align-self-center col-6 text-end">
                    <button onClick={()=>navigate(`/blogs/${blog.id}`)} className="btn btn bg-primary text-white p-3 px-5">
                      Read this blog
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-footer pb-0 mb-0 text-end align-middle">
                <p>Entries: {blog.blogEntryList.length}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default BlogsList;
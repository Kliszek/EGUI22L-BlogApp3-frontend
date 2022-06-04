import { Link, useNavigate, useParams } from "react-router-dom";
import { Blog, BlogEntry } from "../Interfaces/blog.interface";
import useGet from "../useGet";

export const BlogView = () => {
  const { blogId } = useParams();
  //const navigate = useNavigate();

  const { data: blog, isPending, error } = useGet<Blog>(`blogs/${blogId}`);



  return(
    <div className="row justify-content-center my-5">
      <div className="col-10 col-md-8 col-lg-6 col-xl-8 text-start card px-0 shadow-sm">
        {isPending && <h2>Loading...</h2>}
        {error && <span className="text-danger">{error}</span>}
        {blog && <div className="card-header p-5 pb-4 mb-4">
          <Link to='/blogs' className="h2 text-decoration-none d-inline-block pb-2 px-3 fw-semibold text-start border-1 border-bottom text-primary">
            {blog.title}
          </Link>
          <h5 className="h5 mt-3 ps-4 ">
            A blog by: {blog.ownerId}
          </h5>
        </div>}
        {blog && blog.blogEntryList.length > 0 && <div className="card-body mx-md-3 mx-lg-5">
          {blog.blogEntryList.map((blogEntry) => ( <div className="card bg-light pt-3 mb-5">
            <div className="card-body px-4">
              <div className="row ">
                
              </div>
              <h4 className="h4 px-2 lead fw-semibold pb-2 mb-4 border-1 border-bottom text-primary">
                {blogEntry.title}
              </h4>
              <p className="px-2">
                {blogEntry.content}
              </p>
            </div>
            <div className="card-footer mb-0 pb-0 text-end">
              <p className="mb-1 text-secondary">
                Published on: <span className="ms-3">{new Date(blogEntry.dateTime).toLocaleString()}</span>
              </p>
            </div>
          </div>))}
        </div>}
      </div>
    </div>
  );
}

export default BlogView;
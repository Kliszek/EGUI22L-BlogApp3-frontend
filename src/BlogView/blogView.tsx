import { Link, useNavigate, useParams } from "react-router-dom";
import useGet from "../useGet";
import { BlogResponse } from "./blog-response.interface";

export const BlogView = () => {
  const { blogId } = useParams();
  //const navigate = useNavigate();

  const { data: blogRes, isPending, error } = useGet<BlogResponse>(`blogs/${blogId}`);


  return(
    <div className="row justify-content-center my-5">
      <div className="col-10 col-md-8 col-lg-6 col-xl-8 text-start card px-0 shadow-sm">
        {isPending && <h2>Loading...</h2>}
        {error && <span className="text-danger">{error}</span>}
        {blogRes && <div className="card-header d-flex p-5 pb-4 mb-4">
          <div className="flex-grow-1">
            <Link to='/blogs' className="h2 text-decoration-none d-inline-block pb-2 px-3 fw-semibold text-start border-1 border-bottom text-primary">
              {blogRes.blog.title}
            </Link>
            <h5 className="h5 mt-3 ps-4 ">
              A blog by: {blogRes.blog.ownerId}
            </h5>
          </div>
          {blogRes.isOwner && <div>
            <button data-bs-toggle="modal" data-bs-target="#deleteBlogModal" className="btn btn-primary">
              Delete blog
            </button>
          </div>}
        </div>}
        {blogRes && blogRes.blog.blogEntryList.length > 0 && <div className="card-body mx-md-3 mx-lg-5">
          {blogRes.blog.blogEntryList.map((blogEntry) => ( <div className="card bg-light pt-3 mb-5">
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
        {blogRes && blogRes.blog.blogEntryList.length === 0 && <div className="card-body mx-md-3 mx-lg-5">
          <h3 className="h3 text-muted mb-4">
            This blog doesn't contain any entries yet.
          </h3>
        </div>}
      </div>

      {blogRes?.isOwner && <div className="modal fade" id="deleteBlogModal" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Warning!</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            Are you sure you want to delete this blog and all of its content?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger">Delete blog</button>
            </div>
          </div>
        </div>
      </div>}


    </div>
  );
}

export default BlogView;
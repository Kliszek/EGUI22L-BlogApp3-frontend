import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Blog } from "../Interfaces/blog.interface";
import useGet from "../useGet";

export const BlogView = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();

  const { data: blog, isPending, error } = useGet<Blog>(`blogs/${blogId}`);



  return(
    <div className="vh-100 justify-content-center row justify-content-center my-5">
      <div className="col-10 col-md-8 col-lg-6 col-xl-8 text-start card shadow-sm">
        {isPending && <h2>Loading...</h2>}
        {blog && <div className="card-header p-5 pb-4">
          <h2 className="h2 d-inline-block pb-2 px-3 fw-semibold text-start border-1 border-bottom text-primary">
            {blog.title}
          </h2>
          <h5 className="h5 mt-3 ps-4">
            A blog by: {blog.ownerId}
          </h5>
        </div>}
        {blog && blog.blogEntryList.length > 0 && <div className="card-body">
          
        </div>}
      </div>
    </div>
  );
}

export default BlogView;
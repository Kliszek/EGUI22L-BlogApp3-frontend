import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Blog } from "../Interfaces/blog.interface";
import useGet from "../useGet";
import useVerifyAuth, { getUsername } from "../useVerifyAuth";
import { ReactComponent as SearchIcon } from "../svg/search.svg";

export const BlogsList = () => {
  const navigate = useNavigate();

  const { data: blogs, isPending, error } = useGet<Blog[]>('blogs');
  const [ hideOthersBlogs, setHideOthersBlogs ] = useState<boolean>(false);
  const [ searchText, setSearchText ] = useState<string>('');

  useVerifyAuth();

  return (
    <div className="justify-content-center">
      <div className="row d-flex justify-content-center mt-3 mb-4 pb-2">
        <div className="col-10 col-lg-8 d-flex justify-content-center justify-content-md-between align-items-end">
          <div className="d-flex flex-row gap-3 align-items-center pb-2 border-bottom">
            <input value={searchText} onChange={(e)=>setSearchText(e.target.value)} type="search" placeholder="Search blogs..." className="p-2 rounded-1 form-control" />
            <SearchIcon className="text-light fw-bold" />
          </div>
          <div className="form-check d-flex flex-row pb-2 justify-content-center ps-5 pe-4 ps-md-4 pe-md-0 gap-2 border-bottom">
            <input checked={hideOthersBlogs} onChange={(e)=>setHideOthersBlogs(e.target.checked)} style={{width:"1.1rem", height:"1.1rem"}} className="form-check-input" type="checkbox" id="hideOthers"/>
            <label className="h5 form-check-label text-light" htmlFor="hideOthers">
              Hide others' blogs
            </label>
          </div>
        </div>
      </div>
      {isPending && <div className="text-center h3 text-light pt-5 mb-5">Loading...</div>}
      {error && <span className="text-danger my-5">{error}</span>}
      {blogs &&
        blogs.map((blog) => (<>
          {(!hideOthersBlogs || blog.ownerId===getUsername()) &&
          (
            blog.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
            blog.ownerId.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) ||
            blog.blogEntryList[0]?.content.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
          ) &&
          <div key={blog.id} className="row justify-content-center mb-5">
            <div className="col-10 col-lg-8 text-md-start card px-0 shadow-sm">
              <div className="card-body mx-4 m-2">
                <div className="d-flex flex-column flex-md-row justify-content-between">
                  <Link to={`/blogs/${blog.id}`}>
                    <h5 className="h3 d-inline-block ps-2 pe-4 py-1 fw-semibold border-1 border-bottom">{blog.title}</h5>
                  </Link>
                  <p className="text-secondary">A blog by: {blog.ownerId}</p>
                </div>
                <div className="mt-4 d-flex row justify-content-end">
                  <div className="start col-12 col-md-6">
                    <h5 className="ps-2">
                      Latest entry:
                    </h5>
                    <p className="text-nowrap overflow-hidden text-truncate text-start bg-light rounded-3 p-3 pe-5 shadow-sm">
                    { blog.blogEntryList.length > 0 && blog.blogEntryList[0].content}
                    { blog.blogEntryList.length === 0 && <>This blog has no entries yet.</> }
                    </p>
                  </div>
                  <div className="align-self-center col-12 col-md-6 text-md-end">
                    <button onClick={()=>navigate(`/blogs/${blog.id}`)} className="btn btn bg-primary text-white p-3 px-5">
                      Read this blog
                    </button>
                  </div>
                </div>
              </div>
              <div className="card-footer pb-0 mb-0 text-end align-middle text-secondary">
                <p className="mb-2">Entries: {blog.blogEntryList.length}</p>
              </div>
            </div>
          </div>}</>
        ))}
      {blogs && blogs.length === 0 && <div>
        <h3 className="h3 text-muted mb-4 px-4">
              There are no blogs here yet!
        </h3>
        <h4 className="h4 text-muted">
          You can be the first to <Link className="text-decoration-none" to='/blogs/create'>add one</Link>!
        </h4>
      </div>}
    </div>
  );
};

export default BlogsList;

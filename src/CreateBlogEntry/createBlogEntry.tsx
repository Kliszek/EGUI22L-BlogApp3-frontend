import { AxiosError, AxiosResponse } from "axios";
import { FormEvent, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BlogResponse } from "../Interfaces/blog-response.interface";
import BaseHttpService from "../services/base-http.service";
import useGet from "../useGet";
import useVerifyAuth from "../useVerifyAuth";

export const CreateBlogEntry = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useVerifyAuth();

  const {
    data: blogRes,
    isPending: isLoading,
    error: errorLoading,
  } = useGet<BlogResponse>(`blogs/${blogId}`);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    BaseHttpService.post(`blogs/${blogId}`, { title, content })
      .then(() => {
        setError(null);
        navigate(`/blogs/${blogId}`);
      })
      .catch((error: AxiosError) => {
        if (error.response?.status === 401) {
          console.log("Could not authorize, redirecting to login page.");
          navigate("/signin");
        } else {
          console.log(error);
          const response: AxiosResponse | undefined = error.response;
          setError(response?.data ? response.data.message : error.message);
        }
        setIsPending(false);
      });
  };

  return (
    <div className="row justify-content-center mt-5 align-items-center">
      <div className="col-10 col-md-8 col-lg-6 col-xl-5 card ">
        <div className="card-body p-3 m-3">
          <div className="mb-3 border-1 border-bottom">
            <h3 className="h3 pb-2 text-start fw-semibold">Add a new entry</h3>
            <p className="small text-start">
              Please specify the title and content of your new blog entry and
              submit.
            </p>
          </div>
          {(error || errorLoading) && <div className="mb-3 text-danger ">{error} {errorLoading}</div>}
          <form onSubmit={handleSubmit} className="d-flex flex-column">
            {blogRes && <div className="mb-3 pb-2 border-1 border-bottom text-start">
              <p className="mb-2">
                Your entry will be added to blog titled: 
              </p>
              <Link to={`/blogs/${blogId}`} className="h3 text-start text-decoration-none text-primary fw-semibold">
                {blogRes.blog.title}
              </Link>
            </div>}
            <input
              required
              placeholder="The blog entry title..."
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="mb-3 p-2"
            ></input>
            <textarea
              required
              rows={4}
              placeholder="Your blog entry content..."
              onChange={(e) => setContent(e.target.value)}
              value={content}
              className="mb-3 p-2"
              style={{minHeight: "45px"}}
            ></textarea>
            {isPending && (
              <button className="btn btn-primary disabled">
                Adding a new blog entry...
              </button>
            )}
            {!isPending && isLoading &&  (
              <button className="btn btn-primary disabled">Loading...</button>
            )}
            {!isPending && !isLoading && (
              <button className="btn btn-primary">Add a new blog entry</button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogEntry;

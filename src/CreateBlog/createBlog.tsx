import { AxiosError, AxiosResponse } from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import BaseHttpService from "../services/base-http.service";
//import Jwt, { JwtPayload } from "jsonwebtoken";
import useVerifyAuth from "../useVerifyAuth";

export const CreateBlog = () => {
  const navigate = useNavigate();

  const [ title, setTitle ] = useState<string>('');
  const [ isPending, setIsPending ] = useState<boolean>(false);
  const [ error, setError ] = useState<string|null>(null);

  useVerifyAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    BaseHttpService
    .post('blogs', { title })
    .then(() => {
      setError(null);
      navigate('/blogs');
    })
    .catch((error: AxiosError) => {
      if (error.response?.status === 401) {
        console.log("Could not authorize, redirecting to login page.");
        navigate("/signin");
      } else {
        console.log(error);
        const response: AxiosResponse|undefined = error.response;
        setError(response?.data ? response.data.message : error.message);
      }
      setIsPending(false);
    });
  }

  return (
    <div className="row justify-content-center mt-5 align-items-center">
      <div className="col-10 col-md-8 col-lg-6 col-xl-5 card ">
        <div className="card-body p-3 m-3">
          <div className="mb-3 border-1 border-bottom">
            <h3 className="h3 pb-2 text-start fw-semibold">Create a new blog</h3>
            <p className="small text-start">Please specify the title of your new blog and submit.</p>
            
          </div>
          {error && <div className="mb-3 text-danger ">
            {error}
          </div>}
          <form
            onSubmit={handleSubmit}
            className="d-flex flex-column"
          >
            <input
              required
              placeholder="The blog title..."
              id="usernameInput"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="mb-3 p-2"
            ></input>
            {isPending && <button className='btn btn-primary disabled'>Creating a new blog...</button>}
            {!isPending && <button className='btn btn-primary'>Create a new blog</button>}
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
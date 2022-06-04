import { AxiosError } from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UsersService from "../services/users.service";

export const BlogNav = () => {
  const navigate = useNavigate();

  const handleLogOut = async (event: React.MouseEvent<HTMLButtonElement>) => {
    await UsersService.signout()
    .then(()=>{
      navigate('/signin');
    })
    .catch((error: AxiosError)=>{
      console.log(`ERROR: ${error.message}`);
    })
  }

  return (
    <div className="row justify-content-center">
      <div className="navbar col-8 mt-4 p-2 border-1 border-bottom">
          <Link to='/blogs' className="navbar-brand">
            <h3 className="display-5 text-white fw-semibold">
              BlogApp
            </h3>
          </Link>
          <div className="d-flex gap-3">
            <button onClick={()=>navigate('/blogs/create')} className="btn btn-secondary p-3 rounded-pill">
              Create a new blog
            </button>
            <button onClick={handleLogOut} className="btn btn-secondary p-3 rounded-pill">
              Log out
            </button>
          </div>

      </div>
    </div>
  );
}

export default BlogNav;
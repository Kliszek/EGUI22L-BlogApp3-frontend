import { AxiosError } from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import UsersService from "../services/users.service";
import { ReactComponent as PlusIcon } from '../svg/plus.svg';
import { ReactComponent as LogoutIcon } from '../svg/logout.svg';

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
      <div className="navbar col-10 col-lg-8 mt-4 p-2 border-1 border-bottom">
          <Link to='/blogs' className="navbar-brand">
            <h3 className="display-5 text-white fw-semibold">
              BlogApp
            </h3>
          </Link>
          <div className="d-flex h-75 gap-3 align-items-center">
            <button onClick={()=>navigate('/blogs/create')} className="btn btn-secondary p-3 rounded-pill">
              <div className="d-flex flex-row align-items-center justify-content-center gap-2 px-md-1">
                <span className="d-none d-md-inline">Create a new blog</span>
                <PlusIcon />
              </div>
            </button>
            <button onClick={handleLogOut} className="btn btn-secondary p-3 rounded-pill">
              <div className="d-flex flex-row align-items-center justify-content-center gap-2 px-md-1">
                <span className="d-none d-md-inline">Log out</span>
                <LogoutIcon />
              </div>
            </button>
          </div>

      </div>
    </div>
  );
}

export default BlogNav;
import { AxiosError, AxiosResponse } from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import BaseHttpService from "../services/base-http.service";
import useGet from "../useGet";
import { BlogResponse } from "../Interfaces/blog-response.interface";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { ReactComponent as DeleteIcon } from '../svg/trash.svg';
import { ReactComponent as PlusIcon } from '../svg/plus.svg';
import { ReactComponent as OptionsIcon } from '../svg/three-dots.svg'
import Dropdown from "react-bootstrap/Dropdown";

export const BlogView = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [ showDeletionModal, setShowDeletionModal ] = useState<boolean>(false);
  const [ deletionPending, setDeletionPending ] = useState<boolean>(false);
  const [ deletionError, setDeletionError ] = useState<string|null>(null);

  const handleBlogDelete = () => {
    setDeletionPending(true);
    BaseHttpService
    .delete(`blogs/${blogId}`)
    .then(() => {
      navigate('/blogs');
      setDeletionError(null);
      setShowDeletionModal(false);
    })
    .catch((error: AxiosError) => {
      if (error.response?.status === 401) {
        console.log("Could not authorize, redirecting to login page.");
        navigate("/signin");
      } else {
        const response: AxiosResponse|undefined = error.response;
        setDeletionError(response?.data ? response.data.message : error.message);
      }
    }).finally(()=>{
      setDeletionPending(false);
    })
  };

  const {
    data: blogRes,
    isPending,
    error,
  } = useGet<BlogResponse>(`blogs/${blogId}`);

  return (
    <div className="row justify-content-center my-5">
      <div className="col-10 col-lg-8 text-start card px-0 shadow-sm">
        {isPending && <h2>Loading...</h2>}
        {error && <span className="text-danger">{error}</span>}
        {blogRes && (
          <div className="card-header d-flex flex-column-reverse flex-md-row pt-4 pt-md-5 px-5 pb-4 mb-4">
            <div className="flex-grow-1">
              <Link
                to="/blogs"
                className="h2 text-decoration-none d-inline-block pb-2 px-3 fw-semibold text-start border-1 border-bottom text-primary"
              >
                {blogRes.blog.title}
              </Link>
              <h5 className="h5 mt-3 ps-4">
                A blog by: {blogRes.blog.ownerId}
              </h5>
            </div>
            {blogRes.isOwner && (
              <div className="d-flex d-md-block justify-content-around pb-3 mb-2 border-1 border-bottom">
                <button
                  onClick={()=>navigate(`/blogs/${blogId}/add`)}
                  className="btn btn-primary mx-3"
                >
                  <div className="d-flex flex-row align-items-center justify-content-center gap-2 px-md-1">
                    <span className="d-none d-md-inline">Add a new entry</span>
                    <PlusIcon />
                  </div>
                </button>
                <button
                  onClick={()=>setShowDeletionModal(true)}
                  className="btn btn-primary mx-3"
                >
                  <div className="d-flex flex-row align-items-center justify-content-center gap-2 px-md-1">
                    <span className="d-none d-md-inline">Delete blog</span>
                    <DeleteIcon />
                  </div>
                </button>
              </div>
            )}
          </div>
        )}

        {/* BLOG LIST */}
        {blogRes && blogRes.blog.blogEntryList.length > 0 && (
          <div className="card-body mx-md-3 mx-lg-5">
            {blogRes.blog.blogEntryList.map((blogEntry) => (
              <div className="card bg-light mb-5">
                <div className="card-body px-3">
                  <div className="d-flex mb-4 border-1 border-bottom align-items-center">
                    <h4 className="h4 flex-grow-1 pt-3 px-1 lead fw-semibold text-primary">
                      {blogEntry.title}
                    </h4>
                    {blogRes.isOwner && <Dropdown align="end" className="dropdown align-self-start">
                      <Dropdown.Toggle variant="secondary-outline"  className="btn btn-secondary-outline dropdown-no-arrow" data-toggle="dropdown">
                        <OptionsIcon/>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="/">Edit</Dropdown.Item>
                        <Dropdown.Item href="/">Delete</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>}
                  </div>
                  <p className="px-3">{blogEntry.content}</p>
                </div>
                <div className="card-footer mb-0 pb-0 text-end">
                  <p className="mb-1 text-secondary">
                    Published on:{" "}
                    <span className="ms-3">
                      {new Date(blogEntry.dateTime).toLocaleString()}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        {blogRes && blogRes.blog.blogEntryList.length === 0 && (
          <div className="card-body mx-md-3 mx-lg-5">
            <h3 className="h3 text-muted mb-4 px-4">
              This blog doesn't contain any entries yet.
            </h3>
          </div>
        )}
      </div>

      {/* DELETION MODAL */}
      {blogRes?.isOwner && (
        <Modal show={showDeletionModal} onHide={()=>setShowDeletionModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Warning!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {deletionError && <p className="text-danger">{deletionError}</p>}
              Are you sure you want to delete this blog and all of its
              content?
            </Modal.Body>
            <Modal.Footer>
              <button onClick={()=>setShowDeletionModal(false)} className="btn btn-secondary">
                Cancel
              </button>
              {!deletionPending && <button onClick={handleBlogDelete} className="btn btn-danger">
                Delete blog
              </button>}
              {deletionPending && <button onClick={handleBlogDelete} className="btn btn-danger disabled">
                Deleting blog...
              </button>}
            </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default BlogView;

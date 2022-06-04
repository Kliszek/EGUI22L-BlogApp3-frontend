import { AxiosError, AxiosResponse } from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import BaseHttpService from "../services/base-http.service";
import useGet from "../useGet";
import { BlogResponse } from "../Interfaces/blog-response.interface";
import { useState } from "react";
import { ReactComponent as DeleteIcon } from '../svg/trash.svg';
import { ReactComponent as PlusIcon } from '../svg/plus.svg';
import { ReactComponent as OptionsIcon } from '../svg/three-dots.svg'
import Dropdown from "react-bootstrap/Dropdown";
import useVerifyAuth from "../useVerifyAuth";
import { BlogDeletionModal, BlogEntryDeletionModal } from "../Modals";
import { ModalProperties, ModalPropertiesEdit } from "../Modals/modal-properties.interface";
import { BlogEntryEditionModal } from "../Modals/modals";
import { BlogEntry } from "../Interfaces/blog.interface";

export const BlogView = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [ isPending, setIsPending ] = useState<boolean>(false);
  const [ error, setError ] = useState<string|null>(null);
  
  const [ showDeletionModal, setShowDeletionModal ] = useState<boolean>(false);
  const [ showEntryDeletionModal, setShowEntryDeletionModal ] = useState<boolean>(false);
  const [ showEntryEditionModal, setShowEntryEditionModal ] = useState<boolean>(false);

  const [ currentBlogEntry, setCurrentBlogEntry ] = useState<BlogEntry>({id:'',title:'',dateTime:new Date(),content:''});

  useVerifyAuth();

  const {
    data: blogRes,
    isPending: isLoading,
    error: loadingError,
  } = useGet<BlogResponse>(`blogs/${blogId}`);

  const handleBlogDelete = () => {
    setIsPending(true);
    BaseHttpService
    .delete(`blogs/${blogId}`)
    .then(() => {
      navigate('/blogs');
      setError(null);
      setShowDeletionModal(false);
    })
    .catch((error: AxiosError) => {
      if (error.response?.status === 401) {
        console.log("Could not authorize, redirecting to login page.");
        navigate("/signin");
      } else {
        const response: AxiosResponse|undefined = error.response;
        setError(response?.data ? response.data.message : error.message);
      }
    }).finally(()=>{
      setIsPending(false);
    })
  };

  const handleShowEntryDeleteModal = (blogEntry: BlogEntry) => {
    setCurrentBlogEntry(blogEntry);
    setShowEntryDeletionModal(true);
  }

  const handleEntryDelete = () => {
    setIsPending(true);
    BaseHttpService
    .delete(`blogs/${blogId}/${currentBlogEntry?.id}`)
    .then(() => {
      setError(null);
      setShowEntryDeletionModal(false);
      navigate(0);
    })
    .catch((error: AxiosError) => {
      if (error.response?.status === 401) {
        console.log("Could not authorize, redirecting to login page.");
        navigate("/signin");
      } else {
        const response: AxiosResponse|undefined = error.response;
        setError(response?.data ? response.data.message : error.message);
      }
    }).finally(()=>{
      setIsPending(false);
    })
  };

  const handleEntryEdit = (title: string, content: string) => {
    setIsPending(true);
    BaseHttpService
    .patch(`blogs/${blogId}/${currentBlogEntry?.id}`, {title, content})
    .then(() => {
      setError(null);
      setShowEntryEditionModal(false);
      navigate(0);
    })
    .catch((error: AxiosError) => {
      if (error.response?.status === 401) {
        console.log("Could not authorize, redirecting to login page.");
        navigate("/signin");
      } else {
        const response: AxiosResponse|undefined = error.response;
        setError(response?.data ? response.data.message : error.message);
      }
    }).finally(()=>{
      setIsPending(false);
    })
  };

  const handleShowEntryEditionModal = (blogEntry: BlogEntry) => {
    setCurrentBlogEntry(blogEntry);
    setShowEntryEditionModal(true);
  }

  const blogDeletionProps: ModalProperties = {
    showModal: showDeletionModal,
    setShowModal: setShowDeletionModal,
    isPending,
    error,
    onClickHandler: handleBlogDelete
  };

  const blogEntryDeletionProps: ModalProperties = {
    showModal: showEntryDeletionModal,
    setShowModal: setShowEntryDeletionModal,
    isPending,
    error,
    onClickHandler: handleEntryDelete
  }

  const blogEntryEditionProps: ModalPropertiesEdit = {
    showModal: showEntryEditionModal,
    setShowModal: setShowEntryEditionModal,
    isPending,
    error,
    onClickHandler: handleEntryEdit,
    blogEntry: currentBlogEntry,
  }

  return (
    <div className="row justify-content-center my-5">
      <div className="col-10 col-lg-8 text-start card px-0 shadow-sm">
        {isLoading && <h2>Loading...</h2>}
        {loadingError && <span className="text-danger">{loadingError}</span>}
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
                        <Dropdown.Item onClick={()=>handleShowEntryEditionModal(blogEntry)}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={()=>handleShowEntryDeleteModal(blogEntry)}>Delete</Dropdown.Item>
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
        <BlogDeletionModal {...blogDeletionProps}/>
      )}
      {/* ENTRY DELETION MODAL */}
      {blogRes?.isOwner && (
        <BlogEntryDeletionModal {...blogEntryDeletionProps}/>
      )}
      {/* ENTRY EDITION MODAL */}
      {blogRes?.isOwner && (
        <BlogEntryEditionModal {...blogEntryEditionProps} />
      )}
    </div>
  );
};

export default BlogView;

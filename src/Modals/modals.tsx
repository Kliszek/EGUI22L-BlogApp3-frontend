import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { ModalProperties, ModalPropertiesEdit } from "./modal-properties.interface";

export const BlogDeletionModal = (props: ModalProperties) => {
  const { showModal, setShowModal, isPending, error, onClickHandler } = props; 
  return (
    <Modal centered backdrop="static" show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Warning!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        Are you sure you want to delete this blog and all of its content?
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={() => setShowModal(false)}
          className="btn btn-secondary"
        >
          Cancel
        </button>
        {!isPending && (
          <button onClick={()=>onClickHandler()} className="btn btn-danger">
            Delete blog
          </button>
        )}
        {isPending && (
          <button className="btn btn-danger disabled">Deleting blog...</button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export const BlogEntryDeletionModal = (props: ModalProperties) => {
  const { showModal, setShowModal, isPending, error, onClickHandler } = props; 
  return (
    <Modal centered backdrop="static" show={showModal} onHide={()=>setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Warning!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        Are you sure you want to delete this blog entry?
      </Modal.Body>
      <Modal.Footer>
        <button onClick={()=>setShowModal(false)} className="btn btn-secondary">
          Cancel
        </button>
        {!isPending && <button onClick={()=>onClickHandler()} className="btn btn-danger">
          Delete entry
        </button>}
        {isPending && <button className="btn btn-danger disabled">
          Deleting entry...
        </button>}
      </Modal.Footer>
    </Modal>
  );
};

export const BlogEntryEditionModal = (props: ModalPropertiesEdit) => {
  const { showModal, setShowModal, isPending, error, onClickHandler, blogEntry } = props; 

  const [ title, setTitle ] = useState<string>('');
  const [ content, setContent ] = useState<string>('');

  const handleShow = () => {
    setTitle(blogEntry.title);
    setContent(blogEntry.content);
  }

  return (
    <Modal centered backdrop="static" show={showModal} onShow={handleShow} onHide={()=>setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit blog entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <p className="small text-start">
          Please specify the title and content of your new blog entry and submit.
        </p>
        <div className="d-flex flex-column">
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
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={()=>setShowModal(false)} className="btn btn-secondary">
          Cancel
        </button>
        {!isPending && <button onClick={()=>onClickHandler(title,content)} className="btn btn-primary">
          Update entry
        </button>}
        {isPending && <button className="btn btn-primary disabled">
          Updating entry...
        </button>}
      </Modal.Footer>
    </Modal>
  );
};

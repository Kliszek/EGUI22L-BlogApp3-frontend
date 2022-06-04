import Modal from "react-bootstrap/Modal";
import { ModalProperties } from "./modal-properties.interface";

export const BlogDeletionModal = (props: ModalProperties) => {
  const { showModal, setShowModal, isPending, error, onClickHandler } = props; 
  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
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
          <button onClick={onClickHandler} className="btn btn-danger">
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
    <Modal show={showModal} onHide={()=>setShowModal(false)}>
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
        {!isPending && <button onClick={onClickHandler} className="btn btn-danger">
          Delete entry
        </button>}
        {isPending && <button className="btn btn-danger disabled">
          Deleting entry...
        </button>}
      </Modal.Footer>
    </Modal>
  );
};

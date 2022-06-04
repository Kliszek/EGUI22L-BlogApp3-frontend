import { BlogEntry } from "../Interfaces/blog.interface";

export interface ModalProperties {
  showModal: boolean,
  setShowModal: Function,
  isPending: boolean,
  error: string | null,
  onClickHandler: Function
}

export interface ModalPropertiesEdit extends ModalProperties {
  blogEntry: BlogEntry,
}
import { MouseEventHandler } from "react";

export interface ModalProperties {
  showModal: boolean,
  setShowModal: Function,
  isPending: boolean,
  error: string | null,
  onClickHandler: MouseEventHandler
}
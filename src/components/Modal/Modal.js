import React from "react"
import SvgIcon from "../../UI/SvgIcon/SvgIcon"

import "./Modal.scss"

const Modal = ({ isShowing, hide, copyGroup, moveGroup }) => {
  return (
    <>
      {isShowing && (
        <>
          <div className="overlay" onClick={hide} />
          <div className="modal">
            <div className="modal__wrapper">
              <div className="modal__name">
                <span>Actions</span>
              </div>
              <div className="modal__options">
                <div className="modal__option" onClick={copyGroup}>
                  Copy
                </div>
                <div className="modal__option" onClick={moveGroup}>
                  Move
                </div>
              </div>
            </div>
            <button
              type="button"
              className="modal__close-button"
              data-dismiss="modal"
              aria-label="Close"
              onClick={hide}
            >
              <span aria-hidden="true">
                <SvgIcon icon="close" />
              </span>
            </button>
          </div>
        </>
      )}
    </>
  )
}

export default Modal

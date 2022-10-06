import React from "react"

import "./ModalHeader.scss"

const ModalHeader = ({ modalName, children }) => {
  return (
    <div className="modal__wrapper">
      <div className="modal__name">
        <span>{modalName}</span>
      </div>
      {children}
    </div>
  )
}

export default ModalHeader

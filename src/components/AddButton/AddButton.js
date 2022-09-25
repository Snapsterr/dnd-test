import React from "react"
import SvgIcon from "../../UI/SvgIcon/SvgIcon"

import "./AddButton.scss"

const AddButton = ({ openForm, list, grpI, isOpen }) => {
  const buttonText = list.length === grpI ? "Add group" : "Add task"

  return (
    <>
      {!isOpen && (
        <a
          href="#"
          onClick={(e) => openForm(e, grpI)}
          className={
            list.length === grpI
              ? "add-btn__wrapper add-btn__wrapper--group"
              : "add-btn__wrapper"
          }
        >
          <span className="add-btn__icon">
            <SvgIcon icon="add" />
          </span>
          <span className="add-btn__title">{buttonText}</span>
        </a>
      )}
    </>
  )
}

export default AddButton

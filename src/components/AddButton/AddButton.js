import React, { useState } from "react"

import "./AddButton.scss"

const AddCard = ({ openForm, list, grpI }) => {
  const buttonText = list.length === grpI ? "Add group" : "Add task"

  return (
    <a
      href="#"
      onClick={openForm}
      className={
        list.length === grpI
          ? "add-btn__wrapper add-btn__wrapper--group"
          : "add-btn__wrapper"
      }
    >
      <span className="add-btn__icon">
        <svg
          viewBox="0 0 36 36"
          version="1.1"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M30,17H19V6a1,1,0,1,0-2,0V17H6a1,1,0,0,0-1,1,.91.91,0,0,0,1,.94H17V30a1,1,0,1,0,2,0V19H30a1,1,0,0,0,1-1A1,1,0,0,0,30,17Z"></path>
          <rect x="0" y="0" width="36" height="36" fillOpacity="0" />
        </svg>
      </span>
      <span className="add-btn__title">{buttonText}</span>
    </a>
  )
}

export default AddCard

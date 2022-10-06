import React from "react"
import SvgIcon from "../../../UI/SvgIcon/SvgIcon"

import "./ModalBtn.scss"

const ModalBtn = ({ handleModalBtnClick, icon, btnPosition }) => {
  return (
    <button
      type="button"
      className={`modal__close-button modal__close-button--${btnPosition}`}
      onClick={handleModalBtnClick}
    >
      <span aria-hidden="true">
        <SvgIcon icon={icon} />
      </span>
    </button>
  )
}

export default ModalBtn

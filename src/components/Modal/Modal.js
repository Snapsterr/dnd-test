import React, { useState } from "react"
import SvgIcon from "../../UI/SvgIcon/SvgIcon"
import Controls from "../Controls/Controls"
import ModalHeader from "./ModalHeader/ModalHeader"

import "./Modal.scss"
import SubMenuWrapper from "./SubMenuWrapper/SubMenuWrapper"

const Modal = ({
  isShowing,
  hide,
  copyGroup,
  moveGroup,
  deleteGroup,
  grpI,
}) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const [subMenu, setSubMenu] = useState(null)

  const hideModal = (e) => {
    hide(e)
    setIsSubMenuOpen(false)
  }

  const openSubMenu = (e, submenu) => {
    setIsSubMenuOpen(true)
    setSubMenu(submenu)
  }

  const mainMenu = (
    <ModalHeader modalName="Actions">
      <div className="modal__options">
        <div
          className="modal__option"
          onClick={(e) => openSubMenu(e, "copyMenu")}
        >
          Copy
        </div>
        <div
          className="modal__option"
          onClick={(e) => openSubMenu(e, "moveMenu")}
        >
          Move
        </div>
        <div className="modal__option" onClick={deleteGroup}>
          Delete
        </div>
      </div>
      <button
        type="button"
        className="modal__close-button modal__close-button--right"
        data-dismiss="modal"
        onClick={hide}
      >
        <span aria-hidden="true">
          <SvgIcon icon="close" />
        </span>
      </button>
    </ModalHeader>
  )

  return (
    <>
      {isShowing && (
        <>
          <div className="overlay" onClick={hideModal} />
          <div className="modal">
            {isSubMenuOpen ? (
              <SubMenuWrapper
                subMenu={subMenu}
                hideModal={hideModal}
                hide={hideModal}
                setIsSubMenuOpen={setIsSubMenuOpen}
                grpI={grpI}
                moveGroup={moveGroup}
                copyGroup={copyGroup}
              />
            ) : (
              mainMenu
            )}
          </div>
        </>
      )}
    </>
  )
}

export default Modal

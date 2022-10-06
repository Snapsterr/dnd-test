import React from "react"
import ModalBtn from "../ModalBtn/ModalBtn"
import ModalHeader from "../ModalHeader/ModalHeader"
import SubMenuBody from "../SubMenuBody/SubMenuBody"

const SubMenuWrapper = ({
  subMenu,
  hide,
  setIsSubMenuOpen,
  grpI,
  moveGroup,
  copyGroup,
}) => {
  const toMainMenu = () => {
    setIsSubMenuOpen(false)
  }

  const closeModal = (e) => {
    toMainMenu()
    hide(e)
  }

  return (
    <ModalHeader modalName="Move">
      <ModalBtn
        handleModalBtnClick={toMainMenu}
        icon="back"
        btnPosition="left"
      />
      <ModalBtn
        handleModalBtnClick={closeModal}
        icon="close"
        btnPosition="right"
      />
      <SubMenuBody
        subMenu={subMenu}
        copyGroup={copyGroup}
        moveGroup={moveGroup}
        closeModal={closeModal}
        grpI={grpI}
      />
    </ModalHeader>
  )
}

export default SubMenuWrapper

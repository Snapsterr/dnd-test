import React, { useEffect, useRef, useState } from "react"
import { autoHeightArea } from "../../../helpers/autoHeightArea"
import { TextareaField } from "../../../UI/TextareaField/TextareaField"
import Controls from "../../Controls/Controls"

import "./SubMenyBody.scss"

const SubMenuBody = ({ subMenu, copyGroup, moveGroup, closeModal, grpI }) => {
  const [copyTitle, setCopyTitle] = useState("")
  const positionRef = useRef(null)
  const copyTitleRef = useRef(null)
  const grpPosition = grpI + 1

  useEffect(() => {
    if (subMenu !== "copyMenu") return
    // copyTitleRef.current.style.height = "55px"

    // const scrollHeight = copyTitleRef?.current.scrollHeight
    // copyTitleRef.current.style.height = scrollHeight + "px"
    autoHeightArea(copyTitleRef, 55, 0)
  }, [copyTitle])

  const handleCopyTitle = (e) => {
    setCopyTitle(e.target.value)
  }

  const handleCopyGroup = (e) => {
    copyGroup(e, copyTitle)
    closeModal(e)
  }

  const handleMoveGroup = (e) => {
    moveGroup(e, positionRef.current.value)
    closeModal(e)
  }

  const moveMenuBody = (
    <div className="submenu">
      <div className="submenu__item">
        <label className="submenu__name">Current:</label>
        <input
          className="submenu__input"
          type="number"
          value={grpPosition}
          readOnly
          disabled
        />
      </div>
      <div className="submenu__item">
        <label className="submenu__name" htmlFor="to">
          To:
        </label>
        <input
          className="submenu__input"
          type="number"
          ref={positionRef}
          id="to"
          placeholder="Number of column.."
        />
      </div>
      <Controls icon={false} value="Move" onClickHandler={handleMoveGroup} />
    </div>
  )

  const copyMenuBody = (
    <div className="submenu submenu--copy">
      <div className="submenu__name">Name</div>
      <TextareaField
        type="text"
        ref={copyTitleRef}
        value={copyTitle}
        onChange={handleCopyTitle}
        className="submenu__textarea"
        placeholder="Type new group title"
        autoFocus={true}
      />
      <Controls
        icon={false}
        value="Create list"
        onClickHandler={handleCopyGroup}
      />
    </div>
  )

  switch (subMenu) {
    case "moveMenu":
      return moveMenuBody

    case "copyMenu":
      return copyMenuBody

    default:
      return null
  }
}

export default SubMenuBody

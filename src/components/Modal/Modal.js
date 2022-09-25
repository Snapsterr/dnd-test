import React, { useState } from "react"
import SvgIcon from "../../UI/SvgIcon/SvgIcon"
import AddButton from "../AddButton/AddButton"
import Controls from "../Controls/Controls"

import "./Modal.scss"

const Modal = ({
  isShowing,
  hide,
  copyGroup,
  moveGroup,
  deleteGroup,
  grpI,
}) => {
  const [isMoveOpen, setIsMoveOpen] = useState(false)
  const [moveTo, setMoveTo] = useState(grpI)

  const grpPosition = grpI + 1

  const hideModal = (e) => {
    hide(e)
    setIsMoveOpen(false)
  }

  const setMoveOption = () => {
    setIsMoveOpen(!isMoveOpen)
  }

  const handlePositionInput = (e) => {
    setMoveTo(e.target.value)
  }

  const moveGroupHandler = (e) => {
    moveGroup(e, moveTo)
  }

  const isShowingList = (
    <>
      <div className="modal__wrapper">
        <div className="modal__name">
          <span>Actions</span>
        </div>
        <div className="modal__options">
          <div className="modal__option" onClick={copyGroup}>
            Copy
          </div>
          <div className="modal__option" onClick={setMoveOption}>
            Move
            {isMoveOpen && <div>open</div>}
          </div>
          <div className="modal__option" onClick={deleteGroup}>
            Delete
          </div>
        </div>
        <button
          type="button"
          className="modal__close-button modal__close-button--right"
          data-dismiss="modal"
          onClick={hideModal}
        >
          <span aria-hidden="true">
            <SvgIcon icon="close" />
          </span>
        </button>
      </div>
    </>
  )

  const isMoveList = (
    <>
      <div className="modal__wrapper">
        <div className="modal__name">
          <span>Move</span>
        </div>
        <div className="position">
          <div className="position__item">
            <label className="position__name">Current:</label>
            <input
              className="position__input"
              type="number"
              value={grpPosition}
              readOnly
              disabled
            />
          </div>
          <div className="position__item">
            <label className="position__name" htmlFor="to">
              To:
            </label>
            <input
              className="position__input"
              type="number"
              id="to"
              placeholder="Number of column.."
              onChange={handlePositionInput}
            />
          </div>
          <Controls
            icon={false}
            value="Move"
            onClickHandler={moveGroupHandler}
          />
        </div>
        <button
          type="button"
          className="modal__close-button modal__close-button--right"
          data-dismiss="modal"
          onClick={hideModal}
        >
          <span aria-hidden="true">
            <SvgIcon icon="close" />
          </span>
        </button>
        <button
          type="button"
          className="modal__close-button modal__close-button--left"
          data-dismiss="modal"
          onClick={setMoveOption}
        >
          <span aria-hidden="true">
            <SvgIcon icon="back" />
          </span>
        </button>
      </div>
    </>
  )
  return (
    <>
      {isShowing && (
        <>
          <div className="overlay" onClick={hideModal} />
          <div className="modal">{isMoveOpen ? isMoveList : isShowingList}</div>
        </>
      )}
    </>
  )
}

export default Modal

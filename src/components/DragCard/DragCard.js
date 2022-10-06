import React, { useEffect, useRef, useState } from "react"
import { autoHeightArea } from "../../helpers/autoHeightArea"
import { TextareaField } from "../../UI/TextareaField/TextareaField"
import SvgIcon from "../../UI/SvgIcon/SvgIcon"

import "./DragCard.scss"

const DragCard = ({
  grpI,
  handleDragStart,
  handleDragEnter,
  isDragging,
  item,
  itemI,
  dragItem,
  setList,
}) => {
  const { task, isDone } = item
  const [isEditable, setIsEditable] = useState(false)
  const [isTaskDone, setIsTaskDone] = useState(isDone)
  const [cardBody, setCardBody] = useState(task)

  const editRef = useRef(null)
  const cardRef = useRef(null)

  const len = cardBody.length

  useEffect(() => {
    editRef.current.style.pointerEvents = "none"
    autoHeightArea(editRef, 10, 12)
  }, [cardBody])

  useEffect(() => {
    if (isEditable) {
      editRef.current.setSelectionRange(len, len)
      editRef.current.focus()
    }
  }, [isEditable])

  useEffect(() => {
    setList((oldList) => {
      const newList = JSON.parse(JSON.stringify(oldList))
      newList[grpI].items[itemI].isDone = isTaskDone
      return newList
    })
  }, [isTaskDone])

  const getStyles = (params) => {
    const currentItem = dragItem.current
    const isMatch =
      currentItem.grpI === params.grpI && currentItem.itemI === params.itemI

    return isMatch && "card__current"
  }

  const editCard = () => {
    setList((oldList) => {
      const newList = JSON.parse(JSON.stringify(oldList))
      newList[grpI].items[itemI].task = cardBody
      return newList
    })
    setIsEditable(false)
  }

  const editHandler = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setCardBody(e.target.value)
  }

  const setEditable = (e) => {
    e.preventDefault()
    setIsEditable(true)
  }

  const toggleSuccessTask = (e) => {
    setIsTaskDone(!isTaskDone)
  }

  const deleteTask = () => {
    setList((oldList) => {
      const newList = JSON.parse(JSON.stringify(oldList))
      newList[grpI].items.splice(itemI, 1)
      return newList
    })
  }

  return (
    <div
      draggable
      ref={cardRef}
      onDragStart={(e) => {
        handleDragStart(e, { grpI, itemI })
      }}
      onDragEnter={
        isDragging
          ? (e) => {
              handleDragEnter(e, { grpI, itemI })
            }
          : null
      }
      className={`${
        isTaskDone ? "card__item card__item--success" : "card__item"
      } ${isDragging ? getStyles({ grpI, itemI }) : "card__hover"}`}
    >
      <TextareaField
        type={"text"}
        ref={editRef}
        className={`card__body ${isTaskDone ? "card__body--success" : ""} ${
          isDragging ? "card__body--dragging" : ""
        }`}
        value={cardBody}
        onChange={editHandler}
        onBlur={editCard}
        disabled={!isEditable}
      />
      <div className="card__icon-hover">
        {isTaskDone ? (
          <span
            className="card__icon card__icon--delete"
            onClick={toggleSuccessTask}
          >
            <SvgIcon icon="close" />
          </span>
        ) : (
          <>
            <span
              className="card__icon card__icon--correct"
              onClick={toggleSuccessTask}
            >
              <SvgIcon icon="correct" />
            </span>
            <span className="card__icon card__icon--edit" onClick={setEditable}>
              <SvgIcon icon="edit" />
            </span>
          </>
        )}

        <span className="card__icon card__icon--delete" onClick={deleteTask}>
          <SvgIcon icon="trash" />
        </span>
      </div>
      <div className="card__icon-focus">
        <span className="card__icon card__icon--correct" onClick={editCard}>
          <SvgIcon icon="correct" />
        </span>
      </div>
    </div>
  )
}

export default DragCard

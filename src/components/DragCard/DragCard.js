import React, { useEffect, useRef, useState } from "react"
import SvgIcon from "../../UI/SvgIcon/SvgIcon"
import { TextareaField } from "../../UI/TextareaField/TextareaField"

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
  const [isEditable, setIsEditable] = useState(false)
  const [cardBody, setCardBody] = useState(item)

  const editRef = useRef(null)

  const len = cardBody.length

  useEffect(() => {
    editRef.current.style.height = "10px"
    editRef.current.style.pointerEvents = "none"
    const scrollHeight = editRef.current.scrollHeight - 12
    editRef.current.style.height = scrollHeight + "px"
  }, [cardBody])

  useEffect(() => {
    if (isEditable) {
      editRef.current.setSelectionRange(len, len)
      editRef.current.focus()
    }
  }, [isEditable])

  const getStyles = (params) => {
    const currentItem = dragItem.current
    const isMatch =
      currentItem.grpI === params.grpI && currentItem.itemI === params.itemI
    if (isMatch) {
      console.log("match")
      return "card__current card__item"
    }
    return "card__item"
  }

  const editCard = () => {
    setList((oldList) => {
      const newList = JSON.parse(JSON.stringify(oldList))
      newList[grpI].items[itemI] = cardBody
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

  return (
    <div
      draggable
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
      className={
        isDragging ? getStyles({ grpI, itemI }) : "card__item card__hover"
      }
    >
      <TextareaField
        type={"text"}
        ref={editRef}
        className={"card__body"}
        value={cardBody}
        onChange={editHandler}
        onBlur={editCard}
        disabled={!isEditable}
      />
      <span className="card__icon card__icon--edit" onClick={setEditable}>
        <SvgIcon icon="edit" />
      </span>
      <span className="card__icon card__icon--correct" onClick={editCard}>
        <SvgIcon icon="correct" />
      </span>
    </div>
  )
}

export default DragCard

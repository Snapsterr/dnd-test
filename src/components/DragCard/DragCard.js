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
      <span className="card__icon" onClick={setEditable}>
        <SvgIcon icon="edit" />
        {/* <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 217.855 217.855"
        >
          <path
            d="M215.658,53.55L164.305,2.196C162.899,0.79,160.991,0,159.002,0c-1.989,0-3.897,0.79-5.303,2.196L3.809,152.086
	c-1.35,1.352-2.135,3.166-2.193,5.075l-1.611,52.966c-0.063,2.067,0.731,4.069,2.193,5.532c1.409,1.408,3.317,2.196,5.303,2.196
	c0.076,0,0.152-0.001,0.229-0.004l52.964-1.613c1.909-0.058,3.724-0.842,5.075-2.192l149.89-149.889
	C218.587,61.228,218.587,56.479,215.658,53.55z M57.264,201.336l-42.024,1.28l1.279-42.026l91.124-91.125l40.75,40.743
	L57.264,201.336z M159,99.602l-40.751-40.742l40.752-40.753l40.746,40.747L159,99.602z"
          />
        </svg> */}
      </span>
    </div>
  )
}

export default DragCard

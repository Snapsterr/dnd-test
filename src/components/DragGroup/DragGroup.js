import React, { useEffect, useRef, useState } from "react"
import AddForm from "../AddForm/AddForm"
import AddButton from "../AddButton/AddButton"

import "./DragGroup.scss"
import DragCard from "../DragCard/DragCard"
import { TextareaField } from "../../UI/TextareaField/TextareaField"

const DragGroup = ({
  handleDragStart,
  isDragging,
  handleDragEnter,
  dragItem,
  grp,
  grpI,
  setList,
  list,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState(grp.title)

  const titleRef = useRef(null)

  const sectionHeightStyle = isOpen ? "card card--opened" : "card"

  useEffect(() => {
    titleRef.current.style.height = "24px"
    const scrollHeight = titleRef.current.scrollHeight
    titleRef.current.style.height = scrollHeight + "px"
  }, [title])

  const onBlurArea = () => {
    setList((oldList) => {
      const newList = JSON.parse(JSON.stringify(oldList))
      newList[grpI].title = title
      return newList
    })
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      e.target.blur()
    }
  }

  const openForm = (e) => {
    setIsOpen(true)
  }

  const closeForm = (e) => {
    e.stopPropagation()
    setIsOpen(false)
  }
  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  return (
    <div
      onDragEnter={
        isDragging && !grp.items.length
          ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
          : null
      }
      className="dnd-group"
    >
      <div className="title__wrapper">
        <TextareaField
          type={"text"}
          ref={titleRef}
          value={title}
          onChange={handleTitle}
          className="title__name"
          onKeyDown={handleEnter}
          onBlur={onBlurArea}
        />
        <span className="title__icon">
          <svg
            version="1.1"
            id="Layer_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 92 92"
          >
            <path
              d="M21,53c-1.8,0-3.7-0.8-5-2.1c-1.3-1.3-2-3.1-2-4.9c0-1.8,0.8-3.6,2-5c1.3-1.3,3.1-2,5-2c1.8,0,3.6,0.8,4.9,2
            c1.3,1.3,2.1,3.1,2.1,5c0,1.8-0.8,3.6-2.1,4.9C24.6,52.2,22.8,53,21,53z M50.9,50.9c1.3-1.3,2.1-3.1,2.1-4.9c0-1.8-0.8-3.6-2.1-5
            c-1.3-1.3-3.1-2-4.9-2c-1.8,0-3.7,0.8-5,2c-1.3,1.3-2,3.1-2,5c0,1.8,0.8,3.6,2,4.9c1.3,1.3,3.1,2.1,5,2.1
            C47.8,53,49.6,52.2,50.9,50.9z M75.9,50.9c1.3-1.3,2.1-3.1,2.1-4.9c0-1.8-0.8-3.6-2.1-5c-1.3-1.3-3.1-2-4.9-2c-1.8,0-3.7,0.8-5,2
            c-1.3,1.3-2,3.1-2,5c0,1.8,0.8,3.6,2,4.9c1.3,1.3,3.1,2.1,5,2.1C72.8,53,74.6,52.2,75.9,50.9z"
            />
          </svg>
        </span>
      </div>
      <div className={sectionHeightStyle}>
        {grp.items.map((item, itemI) => (
          <div className="card__wrapper" key={item + itemI}>
            <DragCard
              grp={grp}
              grpI={grpI}
              handleDragStart={handleDragStart}
              handleDragEnter={handleDragEnter}
              isDragging={isDragging}
              item={item}
              itemI={itemI}
              dragItem={dragItem}
              setList={setList}
            />
          </div>
        ))}

        <AddForm
          setList={setList}
          list={list}
          grpI={grpI}
          closeForm={closeForm}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </div>
      <AddButton openForm={openForm} grpI={grpI} isOpen={isOpen} list={list} />
    </div>
  )
}

export default DragGroup

import React, { useEffect, useRef, useState } from "react"
import AddSection from "../AddSection/AddSection"
import AddButton from "../AddButton/AddButton"

import "./DragGroup.scss"
import DragCard from "../DragCard/DragCard"

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

  const sectionHeightStyle = isOpen
    ? "dnd-tasks-section dnd-tasks-section--opened"
    : "dnd-tasks-section"

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

  return (
    <div
      onDragEnter={
        isDragging && !grp.items.length
          ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
          : null
      }
      className="dnd-group"
    >
      <textarea
        type="text"
        ref={titleRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="group-title-edit"
        onKeyDown={(e) => handleEnter(e)}
        onBlur={onBlurArea}
      ></textarea>
      <div className={sectionHeightStyle}>
        {grp.items.map((item, itemI) => (
          <div className="card-wrapper" key={item}>
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

        <AddSection
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

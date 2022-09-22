import React, { useEffect, useRef, useState } from "react"
import AddForm from "../AddForm/AddForm"
import AddButton from "../AddButton/AddButton"

import "./DragGroup.scss"
import DragCard from "../DragCard/DragCard"
import { TextareaField } from "../../UI/TextareaField/TextareaField"
import SvgIcon from "../../UI/SvgIcon/SvgIcon"
import Modal from "../Modal/Modal"
import useModal from "../../hooks/useModal"

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
  // const [modal, setModal] = useState(false)
  const [title, setTitle] = useState(grp.title)

  const { isShowing, toggle } = useModal()

  const titleRef = useRef(null)

  const sectionHeightStyle = isOpen ? "card card--opened" : "card"

  useEffect(() => {
    setTitle(grp.title)
  }, [list])

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

  const copyGroup = (e) => {
    setList([...list, list[grpI]])
    toggle(e)
  }

  const changeElementPosition = (array, from, to) => {
    const copy = JSON.parse(JSON.stringify(array))
    const valueToMove = copy.splice(from, 1)[0]
    copy.splice(to, 0, valueToMove)
    return copy
  }

  const moveGroup = (e) => {
    let c = prompt(
      `enter column where you want to move group(from - 1, to - ${list.length})`,
      0
    )
    setList(changeElementPosition(list, grpI, c - 1))
    toggle(e)
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
        <div className="title__settings">
          <span className="title__icon" onClick={toggle}>
            <SvgIcon icon="settings" />
          </span>
          <Modal
            isShowing={isShowing}
            hide={toggle}
            copyGroup={copyGroup}
            moveGroup={moveGroup}
          />
        </div>
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

import React, { useEffect, useRef, useState } from "react"
import AddForm from "../AddForm/AddForm"
import AddButton from "../AddButton/AddButton"
import DragCard from "../DragCard/DragCard"
import { TextareaField } from "../../UI/TextareaField/TextareaField"
import SvgIcon from "../../UI/SvgIcon/SvgIcon"
import Modal from "../Modal/Modal"
import useModal from "../../hooks/useModal"
import { autoHeightArea } from "../../helpers/autoHeightArea"

import "./DragGroup.scss"

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

  const { isShowing, toggle } = useModal()

  const titleRef = useRef(null)
  const scrollRef = useRef(null)

  const sectionHeightStyle = isOpen ? "card card--opened" : "card"

  useEffect(() => {
    setTitle(grp.title)
  }, [list])

  useEffect(() => {
    scrollRef.current.scrollIntoView()
  }, [isOpen])

  useEffect(() => {
    autoHeightArea(titleRef, 24, 0)
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

  const copyGroup = (e, name) => {
    setList([...list, { title: name, items: list[grpI].items }])
  }

  const changeElementPosition = (array, from, to) => {
    const copyArr = JSON.parse(JSON.stringify(array))
    const valueToMove = copyArr.splice(from, 1)[0]
    copyArr.splice(to, 0, valueToMove)
    return copyArr
  }

  const moveGroup = (e, moveTo) => {
    if (moveTo > list.length) return alert("Wrong number of column. Try again")
    setList(changeElementPosition(list, grpI, moveTo - 1))
  }

  const deleteGroup = (e) => {
    setList((oldList) => {
      const newList = JSON.parse(JSON.stringify(oldList))
      newList.splice(grpI, 1)[0]

      return newList
    })
    toggle(e)
  }

  return (
    <div className="dnd-group">
      <div className="title__wrapper">
        <TextareaField
          type="text"
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
            deleteGroup={deleteGroup}
            grpI={grpI}
          />
        </div>
      </div>
      <div className={sectionHeightStyle}>
        {grp.items.map((item, itemI) => {
          return (
            <div className="card__wrapper" key={item.task + itemI}>
              <DragCard
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
          )
        })}

        <AddForm
          setList={setList}
          list={list}
          grpI={grpI}
          closeForm={closeForm}
          isOpen={isOpen}
        />
        <div ref={scrollRef}></div>
      </div>
      <AddButton openForm={openForm} grpI={grpI} isOpen={isOpen} list={list} />
    </div>
  )
}

export default DragGroup

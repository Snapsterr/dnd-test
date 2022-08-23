import React, { useState, useRef } from "react"
import AddCardForm from "../AddCardForm/AddCardForm"

import "./DragNDrop.scss"

const DragNDrop = ({ data }) => {
  const [list, setList] = useState(data)
  const [isDragging, setIsDragging] = useState(false)

  const dragItem = useRef()
  const dragNode = useRef()

  const handleDragStart = (e, params) => {
    console.log("drag starting", params)
    dragItem.current = params
    dragNode.current = e.target
    dragNode.current.addEventListener("dragend", handleDragEnd)
    setTimeout(() => {
      setIsDragging(true)
    }, 0)
  }

  const handleDragEnter = (e, params) => {
    console.log("ddd", params)
    const currentItem = dragItem.current
    if (e.target !== dragNode.current) {
      console.log("not same")
      setList((oldList) => {
        let newList = JSON.parse(JSON.stringify(oldList))
        newList[params.grpI].items.splice(
          params.itemI,
          0,
          newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]
        )
        dragItem.current = params
        return newList
      })
    }
  }

  const handleDragEnd = () => {
    console.log("drag end")
    setIsDragging(false)
    dragNode.current.removeEventListener("dragend", handleDragEnd)
    dragItem.current = null
    dragNode.current = null
  }

  const getStyles = (params) => {
    const currentItem = dragItem.current
    const isMatch =
      currentItem.grpI === params.grpI && currentItem.itemI === params.itemI
    if (isMatch) {
      return "current dnd-item"
    }
    return "dnd-item"
  }

  return (
    <div className="drag-n-drop">
      {list.map((grp, grpI) => {
        console.log(grp, grp.isAddFieldOpen)
        return (
          <label
            onDragEnter={
              isDragging && !grp.items.length
                ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
                : null
            }
            key={grp.title}
            className="dnd-group"
          >
            <div className="group-title">{grp.title}</div>
            {grp.items.map((item, itemI) => (
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
                key={item}
                className={isDragging ? getStyles({ grpI, itemI }) : "dnd-item"}
              >
                {item}
              </div>
            ))}
            <AddCardForm list={list} grpI={grpI} />
          </label>
        )
      })}
    </div>
  )
}

export default DragNDrop

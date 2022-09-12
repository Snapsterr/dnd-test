import React, { useRef, useState } from "react"
import AddCardForm from "../AddCardForm/AddCardForm"

import "./DragGroups.scss"
import DragGroup from "../DragGroup/DragGroup"

const DragGroups = ({ data }) => {
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
    const currentItem = dragItem.current

    if (e.target !== dragNode.current) {
      console.log("not same")
      setList((oldList) => {
        console.log("old", oldList)
        let newList = JSON.parse(JSON.stringify(oldList))
        newList[params.grpI].items.splice(
          params.itemI,
          0,
          newList[currentItem.grpI].items.splice(currentItem.itemI, 1)[0]
        )
        dragItem.current = params
        console.log("new", newList)
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

  return (
    <div className="drag-n-drop">
      {list.map((grp, grpI) => (
        <div key={grpI}>
          <DragGroup
            grp={grp}
            grpI={grpI}
            handleDragStart={handleDragStart}
            isDragging={isDragging}
            handleDragEnter={handleDragEnter}
            dragItem={dragItem}
            setList={setList}
            list={list}
          />
        </div>
      ))}
      <AddCardForm setList={setList} list={list} grpI={list.length} />
    </div>
  )
}

export default DragGroups

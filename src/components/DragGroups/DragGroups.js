import React, { useRef, useState } from "react"
import SwitchWrapper from "../SwitchWrapper/SwitchWrapper"

import "./DragGroups.scss"
import DragGroup from "../DragGroup/DragGroup"

const DragGroups = ({ data }) => {
  const [list, setList] = useState(data)
  const [isDragging, setIsDragging] = useState(false)
  console.log(list)
  const dragItem = useRef()
  const dragNode = useRef()

  const handleDragStart = (e, params) => {
    console.log("drag starting")
    dragItem.current = params
    dragNode.current = e.currentTarget
    dragNode.current.addEventListener("dragend", handleDragEnd)
    setTimeout(() => {
      setIsDragging(true)
    }, 0)
  }

  const handleDragEnter = (e, params) => {
    const currentItem = dragItem.current
    if (e.currentTarget !== dragNode.current) {
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
      <SwitchWrapper setList={setList} list={list} grpI={list.length} />
    </div>
  )
}

export default DragGroups

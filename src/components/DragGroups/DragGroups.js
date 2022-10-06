import React, { useEffect, useRef, useState } from "react"
import SwitchWrapper from "../SwitchWrapper/SwitchWrapper"
import DragGroup from "../DragGroup/DragGroup"
import { storage } from "../../helpers/storage"

import "./DragGroups.scss"

const defaultData = [
  { title: "Upcoming", items: [] },
  { title: "In Progress", items: [] },
  { title: "Done", items: [] },
]

const DragGroups = () => {
  const [list, setList] = useState(storage.getItem("data") || defaultData)
  const [isDragging, setIsDragging] = useState(false)

  const dragItem = useRef()
  const dragNode = useRef()

  useEffect(() => {
    storage.setItem("data", list)
  }, [list])

  const handleDragStart = (e, params) => {
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
    setIsDragging(false)
    dragNode.current.removeEventListener("dragend", handleDragEnd)
    dragItem.current = null
    dragNode.current = null
  }

  return (
    <div className="drag-n-drop">
      {list.map((grp, grpI) => (
        <div
          className="group-wrapper"
          onDragEnter={
            isDragging && !grp.items.length
              ? (e) => handleDragEnter(e, { grpI, itemI: 0 })
              : null
          }
          key={grpI}
        >
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

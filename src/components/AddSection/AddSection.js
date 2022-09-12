import React, { useEffect, useRef, useState } from "react"
import Controls from "../Controls/Controls"

import "./AddSection.scss"

const AddSection = ({ list, setList, grpI, closeForm, isOpen }) => {
  const [currentValue, setCurrentValue] = useState("")

  const scrollRef = useRef(null)
  const textareaRef = useRef(null)

  const groupBGStyle = list.length === grpI ? "task task--group" : "task"
  const placeholderValue =
    list.length === grpI ? "Add group name..." : "Add some task here..."
  const controlsStyle =
    list.length === grpI
      ? "task__controls task__controls--group"
      : "task__controls"

  useEffect(() => {
    scrollRef.current.scrollIntoView({ block: "center" })
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    textareaRef.current.style.height = "44px"

    if (grpI === list.length) {
      textareaRef.current.style.height = "18px"
    }
    const scrollHeight = textareaRef.current.scrollHeight
    textareaRef.current.style.height = scrollHeight + "px"
  }, [currentValue, isOpen])

  const inputTextField = (e) => {
    setCurrentValue(e.target.value)
  }

  const addList = () => {
    setList((oldList) => {
      const newList = JSON.parse(JSON.stringify(oldList))
      newList.push({ title: currentValue, items: [] })
      setCurrentValue("")
      return newList
    })
    setCurrentValue("")
  }

  const addTask = () => {
    setList((oldList) => {
      const newList = JSON.parse(JSON.stringify(oldList))
      newList[grpI].items.push(currentValue)
      setCurrentValue("")
      return newList
    })
    setCurrentValue("")
  }

  const onSubmit = (e) => {
    console.log("submitted")
    if (!currentValue.length) return
    if (grpI === list.length) {
      return addList()
    }
    addTask()
  }

  const handleEnterKey = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <div className={groupBGStyle} ref={scrollRef}>
      {isOpen && (
        <>
          <textarea
            type="text"
            ref={textareaRef}
            value={currentValue}
            onChange={inputTextField}
            className="task__textarea"
            placeholder={placeholderValue}
            onKeyDown={handleEnterKey}
            autoFocus
          ></textarea>
          <Controls
            onSubmit={onSubmit}
            closeForm={closeForm}
            grpI={grpI}
            containerStyle={controlsStyle}
          />
        </>
      )}
    </div>
  )
}

export default AddSection

import React, { useEffect, useRef, useState } from "react"
import { TextareaField } from "../../UI/TextareaField/TextareaField"
import Controls from "../Controls/Controls"

import "./AddForm.scss"

const AddForm = ({ list, setList, grpI, closeForm, isOpen }) => {
  const [currentValue, setCurrentValue] = useState("")

  const scrollRef = useRef(null)
  const textareaRef = useRef(null)

  const groupBGStyle = list.length === grpI ? "form form--group" : "form"
  const placeholderValue =
    list.length === grpI ? "Add group name..." : "Add some task here..."
  const controlsStyle =
    list.length === grpI
      ? "form__controls form__controls--group"
      : "form__controls"

  useEffect(() => {
    scrollRef.current.scrollIntoView({ block: "center" })
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    textareaRef.current.style.height = "50px"

    if (grpI === list.length) {
      textareaRef.current.style.height = "20px"
    }
    const scrollHeight = textareaRef.current.scrollHeight - 6
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

  const focusInCurrentTarget = ({ relatedTarget, currentTarget }) => {
    if (relatedTarget === null) return false

    let node = relatedTarget.parentNode

    while (node !== null) {
      if (node === currentTarget) return true
      node = node.parentNode
    }
    return false
  }

  const onBlur = (e) => {
    if (!focusInCurrentTarget(e)) {
      console.log("table blurred")
      onSubmit()
      closeForm(e)
    }
  }

  return (
    <form
      className={groupBGStyle}
      ref={scrollRef}
      onSubmit={onSubmit}
      onBlur={onBlur}
    >
      {isOpen && (
        <>
          <TextareaField
            type={"text"}
            ref={textareaRef}
            value={currentValue}
            onChange={inputTextField}
            className="form__textarea"
            placeholder={placeholderValue}
            onKeyDown={handleEnterKey}
            autoFocus={true}
          />
          <Controls
            closeForm={closeForm}
            grpI={grpI}
            containerStyle={controlsStyle}
            icon={true}
            value="Add task"
          />
        </>
      )}
    </form>
  )
}

export default AddForm

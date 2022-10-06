import React, { useEffect, useRef, useState } from "react"
import { autoHeightArea } from "../../helpers/autoHeightArea"
import { TextareaField } from "../../UI/TextareaField/TextareaField"
import Controls from "../Controls/Controls"

import "./AddForm.scss"

const AddForm = ({ list, setList, grpI, closeForm, isOpen }) => {
  const [currentValue, setCurrentValue] = useState("")

  const textareaRef = useRef(null)
  const wrapperRef = useRef(null)

  const isLast = list.length === grpI

  const groupBGStyle = isLast ? "form form--group" : "form"
  const placeholderValue = isLast
    ? "Add group name..."
    : "Add some task here..."
  const controlsStyle = isLast
    ? "form__controls form__controls--group"
    : "form__controls"
  const buttonText = isLast ? "Add group" : "Add task"

  useEffect(() => {
    if (!isOpen) return

    autoHeightArea(textareaRef, 50, 6)

    if (isLast) {
      textareaRef.current.style.height = "24px"
    }
  }, [currentValue, isOpen])

  const inputTextField = (e) => {
    setCurrentValue(e.target.value)
  }

  const addList = () => {
    setList((oldList) => {
      setCurrentValue("")
      return [...oldList, { title: currentValue, items: [] }]
    })
  }

  const addTask = () => {
    setList((oldList) => {
      const newList = JSON.parse(JSON.stringify(oldList))
      newList[grpI].items.push({
        task: currentValue,
        isDone: false,
      })
      setCurrentValue("")
      return newList
    })
  }

  const onSubmit = (e) => {
    if (!currentValue.length) return
    if (isLast) {
      closeForm(e)
      return addList()
    }
    addTask()
    closeForm(e)
  }

  const handleEnterKey = (e) => {
    if (e.keyCode === 13) {
      onSubmit(e)
    }
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isOpen &&
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target)
      ) {
        onSubmit(e)
        closeForm(e)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isOpen, onSubmit])

  return (
    <form className={groupBGStyle} ref={wrapperRef} tabIndex="0">
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
            onClickHandler={onSubmit}
            value={buttonText}
          />
        </>
      )}
    </form>
  )
}

export default AddForm

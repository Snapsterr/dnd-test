import React, { useEffect, useRef, useState } from "react"

import "./InputField.scss"

const InputField = ({ closeForm, list, setList, grpI }) => {
  console.log("grp", grpI)
  const [currentValue, setCurrentValue] = useState("")
  const textareaRef = useRef(null)

  const groupBGStyle = list.length === grpI ? "task task--group" : "task"
  const placeholderValue =
    list.length === grpI ? "Add group name..." : "Add some task here..."
  const controlsStyle =
    list.length === grpI
      ? "task__controls task__controls--group"
      : "task__controls"

  console.log(controlsStyle)

  useEffect(() => {
    textareaRef.current.style.height = "44px"

    if (grpI === list.length) {
      textareaRef.current.style.height = "24px"
    }
    const scrollHeight = textareaRef.current.scrollHeight
    textareaRef.current.style.height = scrollHeight + "px"
  }, [currentValue])

  const inputTextField = (e) => {
    console.log(e.target.value)
    setCurrentValue(e.target.value)
  }

  const addList = () => {
    setList((oldList) => {
      const newList = JSON.parse(JSON.stringify(oldList))
      newList.push({ title: currentValue, items: [] })
      setCurrentValue("")
      return newList
    })
  }

  const addTask = () => {
    setList((oldList) => {
      const newList = JSON.parse(JSON.stringify(oldList))
      newList[grpI].items.push(currentValue)
      setCurrentValue("")
      return newList
    })
  }

  const onSubmit = (e) => {
    console.log("submitted")
    e.preventDefault()
    if (!currentValue.length) return
    if (grpI === list.length) {
      return addList()
    }
    addTask()
  }
  return (
    <div className={groupBGStyle}>
      <textarea
        type="text"
        ref={textareaRef}
        value={currentValue}
        onChange={inputTextField}
        className="task__textarea"
        placeholder={placeholderValue}
        autoFocus
      ></textarea>
      <div className={controlsStyle}>
        <input
          type="submit"
          onClick={onSubmit}
          className="task__submit"
          value="Add task"
        />
        <a href="#" onClick={closeForm} className="task__close">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default InputField

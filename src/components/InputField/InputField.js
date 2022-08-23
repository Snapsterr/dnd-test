import React, { useEffect, useRef, useState } from "react"

import "./InputField.scss"

const InputField = ({ closeForm, list, grpI }) => {
  console.log("list", list[grpI].items)
  const [currentValue, setCurrentValue] = useState("")
  const textareaRef = useRef(null)

  useEffect(() => {
    textareaRef.current.style.height = "40px"
    const scrollHeight = textareaRef.current.scrollHeight
    textareaRef.current.style.height = scrollHeight + "px"
  }, [currentValue])

  const inputTextField = (e) => {
    console.log(e.target.value)
    setCurrentValue(e.target.value)
  }

  const onSubmit = (e) => {
    console.log("submitted")
    e.preventDefault()
    const currentItem = list[grpI].items
    currentItem.push(currentValue)
    setCurrentValue("")
  }
  return (
    <div className="task">
      <textarea
        type="text"
        ref={textareaRef}
        value={currentValue}
        onChange={inputTextField}
        className="task__textarea"
        placeholder="Add some task here..."
      ></textarea>
      <div className="task__controls">
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

import React, { useState } from "react"
import AddButton from "../AddButton/AddButton"
import InputField from "../InputField/InputField"

import "./AddCardForm.scss"

const AddCardForm = ({ list, grpI }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openForm = (e) => {
    e.preventDefault()
    setIsOpen(true)
  }

  const closeForm = (e) => {
    setIsOpen(false)
  }

  return (
    <div className="">
      {isOpen ? (
        <InputField list={list} grpI={grpI} closeForm={closeForm} />
      ) : (
        <AddButton openForm={openForm} />
      )}
    </div>
  )
}

export default AddCardForm

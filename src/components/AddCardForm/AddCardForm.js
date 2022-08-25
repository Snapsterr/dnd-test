import React, { useState } from "react"
import AddButton from "../AddButton/AddButton"
import InputField from "../InputField/InputField"

import "./AddCardForm.scss"

const AddCardForm = ({ setList, list, grpI }) => {
  const [isOpen, setIsOpen] = useState(false)

  const openForm = (e) => {
    e.preventDefault()
    setIsOpen(true)
  }

  const closeForm = (e) => {
    e.stopPropagation()
    setIsOpen(false)
  }

  return (
    <div className="card-form">
      {isOpen ? (
        <InputField
          setList={setList}
          list={list}
          grpI={grpI}
          closeForm={closeForm}
        />
      ) : (
        <AddButton openForm={openForm} list={list} grpI={grpI} />
      )}
    </div>
  )
}

export default AddCardForm

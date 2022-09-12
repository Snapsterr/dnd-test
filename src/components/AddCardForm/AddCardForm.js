import React, { useState } from "react"
import AddButton from "../AddButton/AddButton"
import AddSection from "../AddSection/AddSection"

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
        <AddSection
          list={list}
          setList={setList}
          grpI={grpI}
          closeForm={closeForm}
          isOpen={isOpen}
        />
      ) : (
        <AddButton openForm={openForm} grpI={grpI} list={list} />
      )}
    </div>
  )
}

export default AddCardForm

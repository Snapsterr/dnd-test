import React, { useState } from "react"
import AddButton from "../AddButton/AddButton"
import AddForm from "../AddForm/AddForm"

import "./SwitchWrapper.scss"

const SwitchWrapper = ({ setList, list, grpI }) => {
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
        <AddForm
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

export default SwitchWrapper

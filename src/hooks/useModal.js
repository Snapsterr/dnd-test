import { useState } from "react"

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false)

  const toggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsShowing(!isShowing)
    console.log("toggle")
  }

  return {
    isShowing,
    toggle,
  }
}

export default useModal

import { useState } from "react"

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false)

  const toggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsShowing(!isShowing)
  }

  return {
    isShowing,
    toggle,
  }
}

export default useModal

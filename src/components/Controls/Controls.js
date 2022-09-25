import React from "react"
import SvgIcon from "../../UI/SvgIcon/SvgIcon"

import "./Controls.scss"

const Controls = ({
  closeForm,
  containerStyle,
  icon,
  value,
  onClickHandler,
}) => {
  return (
    <div className={containerStyle || null}>
      <input
        type="submit"
        className="form__submit"
        value={value}
        onClick={onClickHandler}
      />
      {icon && (
        <a href="#" className="form__close" onClick={closeForm}>
          <SvgIcon icon="close" />
        </a>
      )}
    </div>
  )
}

export default Controls

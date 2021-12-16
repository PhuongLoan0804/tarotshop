import React from "react"

const Alert = (props) => {
  return (
    <div className={props.className}>
      <p>{props.message}</p>
    </div>
  )
}

export default Alert

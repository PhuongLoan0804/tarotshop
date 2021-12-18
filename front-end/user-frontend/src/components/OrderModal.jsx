import React, { useEffect } from "react"
import { makeGetRequest } from "../utils/makeRequest"

const OrderModal = ({ closeModal }) => {
  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <div className='titleCloseBtn'>
          <button onClick={() => closeModal(false)}>X</button>
        </div>

        <div className='modal-footer'>
          <button id='cancelBtn' onClick={() => closeModal(false)}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  )
}

export default OrderModal

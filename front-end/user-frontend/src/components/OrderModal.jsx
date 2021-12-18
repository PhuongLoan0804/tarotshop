import { useState, useEffect } from "react"
import { makeGetRequest } from "../utils/makeRequest"

const OrderModal = ({ closeModal, orderId }) => {
  const [items, setItems] = useState([])

  useEffect(() => {
    const getOrder = async () => {
      const order = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/orders/${orderId}`
      )

      console.log(order)
      return order
    }

    setItems(getOrder())
  }, [orderId])

  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <div className='titleCloseBtn'>
          <button onClick={() => closeModal(false)}>X</button>
        </div>

        {/* // items.map.... */}

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

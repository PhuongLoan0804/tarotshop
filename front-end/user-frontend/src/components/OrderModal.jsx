import { useState, useEffect } from "react"
import { makeGetRequest } from "../utils/makeRequest"
import numberWithCommas from "../utils/numberWithCommas"

const OrderModal = ({ closeModal, orderId }) => {
  const [items, setItems] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getOrder = async () => {
      const order = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/orders/${orderId}`
      )

      // console.log(order)

      const productsId = order.products.map((product) => product.id)

      const productsFromDb = await makeGetRequest(
        `${
          process.env.REACT_APP_BACK_END_URL
        }/products/?productsId=${productsId.toString()}`
      )

      // console.log(productsFromDb)
      // console.log(order.products)

      setProducts(
        productsFromDb.map((product) => {
          const match = order.products.find((prod) => prod.id === product._id)
          return {
            ...product,
            quantity: match.quantity,
          }
        })
      )

      setItems(order)
    }
    getOrder()
  }, [])

  return (
    <div className='modalBackground'>
      <div className='modalContainer'>
        <div className='titleCloseBtn'>
          <button onClick={() => closeModal(false)}>X</button>
        </div>

        <div className='account__cart-body'>
          <h1>Đơn hàng {items._id}</h1>
          <table>
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Số lượng</th>
                <th>Giá</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              {products.map((cart) => {
                return (
                  <tr key={cart._id}>
                    <td>{cart.title}</td>
                    <td>{cart.quantity}</td>
                    <td>{numberWithCommas(cart.price)}</td>
                    <td>{numberWithCommas(cart.quantity * cart.price)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
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

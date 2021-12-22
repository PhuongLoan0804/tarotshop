import "./Order.css"

import { useState } from "react"
import { useEffect } from "react"
import { makeGetRequest, makePatchRequest } from "../../utils/makeRequest"

export default function Order() {
  const [order, setOrder] = useState({
    city: "",
    district: "",
    ward: "",
    detailAddress: "",
    orderId: "",
    status: "",
    owner: "",
    ownerId: "",
    orderDate: "",
    totalProducts: 0,
    totalPrice: 0,
    phoneNumber: "",
  })

  const [updateOrder, setUpdateOrder] = useState({})
  const [products, setProducts] = useState([])

  const url = window.location.href
  const urlSplited = url.split("/")
  const orderId = urlSplited[urlSplited.length - 1]

  useEffect(() => {
    const getOrderById = async () => {
      const orderById = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/orders/${orderId}`
      )

      const productsId = orderById.products.map((product) => product.id)
      const productsFromDb = await makeGetRequest(
        `${
          process.env.REACT_APP_BACK_END_URL
        }/products/?productsId=${productsId.toString()}`
      )

      setProducts(
        productsFromDb.map((product) => {
          const match = orderById.products.find(
            (prod) => prod.id === product._id
          )
          return {
            ...product,
            quantity: match.quantity,
          }
        })
      )
      delete orderById.products
      setOrder(orderById)
    }
    getOrderById()
  }, [orderId])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setUpdateOrder({ ...updateOrder, [name]: value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const newOrder = await makePatchRequest(
      `${process.env.REACT_APP_BACK_END_URL}/orders/${orderId}`,
      updateOrder
    )
    delete newOrder.products
    setOrder(newOrder)
    alert("UPDATED !")
  }
  return (
    <div className='product'>
      <div className='productTitleContainer'>
        <h1 className='productTitle'>Order</h1>
      </div>
      <div className='productTop'>
        <div className='productTopRight'>
          <div className='productInfoBottom'>
            {Object.keys(order).map((key) => {
              return (
                <div className='productInfoItem' key={key}>
                  <span className='productInfoKey'>{key}</span>
                  <span className='productInfoValue'>
                    {["city", "district", "ward"].indexOf(key) > -1
                      ? order[key].label
                      : key === "orderDate"
                      ? new Date(order[key]).toLocaleString()
                      : JSON.stringify(order[key])
                          .replace('"', "")
                          .replace('"', "")}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {products.map((product) => {
        return (
          <div className='productTop' key={product._id}>
            <div className='productTopRight'>
              <div className='productInfoBottom'>
                <div className='productInfoItem'>
                  <span className='productInfoKey'>Name</span>
                  <span className='productInfoValue'>{product.title}</span>
                </div>
              </div>
              <div className='productInfoBottom'>
                <div className='productInfoItem' key={product._id}>
                  <span className='productInfoKey'>Quantity</span>
                  <span className='productInfoValue'>{product.quantity}</span>
                </div>
              </div>
              <div className='productInfoBottom'>
                <div className='productInfoItem' key={product._id}>
                  <span className='productInfoKey'>Price</span>
                  <span className='productInfoValue'>{product.price}</span>
                </div>
              </div>
              <div className='productInfoBottom'>
                <div className='productInfoItem' key={product._id}>
                  <span className='productInfoKey'>Total</span>
                  <span className='productInfoValue'>
                    {product.price * product.quantity}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      })}

      <div className='productBottom'>
        <form className='productForm'>
          <div className='productFormLeft'>
            <label>Status</label>
            <select
              name='status'
              value={updateOrder.status}
              onChange={handleOnChange}
            >
              <option value='PENDING'>PENDING</option>
              <option value='APPROVED'>APPROVED</option>
              <option value='DECLINED'>DECLINED</option>
            </select>
          </div>
          <div className='productFormRight'>
            <button className='productButton' onClick={handleUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

import Helmet from "../components/Helmet"
import Grid from "../components/Grid"
import Button from "../components/Button"
import Modal from "../components/Modal"
import OrderModal from "../components/OrderModal"

import { useState, useEffect } from "react"

import { makeGetRequest } from "../utils/makeRequest"
import numberWithCommas from "../utils/numberWithCommas"

const Account = () => {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    address: "",
  }
  const [{ name, email, phone, address }, setAccount] = useState(initialState)

  const [carts, setCart] = useState([])

  const [modalOpen, setModalOpen] = useState(false)
  const [orderModal, setOrderModal] = useState(false)
  const [orderId, setOrderId] = useState("")

  const handleEditButton = () => setModalOpen(true)

  const handleShowOrderDetail = async (e) => {
    e.preventDefault()
    setOrderModal(true)
    setOrderId(e.target.attributes.getNamedItem("orderid").value)
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await makeGetRequest(
          `${process.env.REACT_APP_BACK_END_URL}/users/me`
        )

        const orders = await makeGetRequest(
          `${process.env.REACT_APP_BACK_END_URL}/orders`
        )

        setCart(orders)

        setAccount({
          name: user.user.name,
          email: user.user.email,
          phone: user.user.phone,
          address: user.user.address,
        })
      } catch (error) {
        alert("errorr")
        window.location.href = "/login"
      }
    }
    getUser()
  }, [name, email, orderId])

  return (
    <Helmet title='Tài khoản'>
      <div className='account'>
        <Grid col={2} mdCol={2} smCol={1} gap={20}>
          <div className='account__info'>
            <div className='account__info-title'>
              <h1>thông tin tài khoản</h1>
            </div>
            <div className='account__info-form'>
              <div className='form-group'>
                <label>Tên tài khoản</label>
                <p>{name}</p>
              </div>
              <div className='form-group'>
                <label>Email</label>
                <p>{email}</p>
              </div>
              <div className='form-group'>
                <label>Phone</label>
                <p>{phone}</p>
              </div>
              <div className='form-group'>
                <label>Địa chỉ</label>
                <p>{address}</p>
              </div>
              <div className='btn-group'>
                <Button size='sm' onClick={handleEditButton}>
                  Sửa
                </Button>
              </div>
            </div>
          </div>
          <div className='account__cart'>
            <div className='account__cart-title'>
              <h1>lịch sử đơn hàng</h1>
            </div>

            <div className='account__cart-body'>
              <table>
                <thead>
                  <tr>
                    <th>Mã đơn hàng</th>
                    <th>Ngày mua</th>
                    <th>Sản phẩm</th>
                    <th>Trạng thái</th>
                    <th>Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((cart) => {
                    return (
                      <tr key={cart._id}>
                        <td>
                          <p onClick={handleShowOrderDetail} orderid={cart._id}>
                            {cart._id.toString().substring(12, 24)}
                          </p>
                        </td>
                        <td>{new Date(cart.orderDate).toLocaleString()}</td>
                        <td>Đơn hàng này có {cart.totalProducts} sản phẩm</td>
                        <td>{cart.status}</td>
                        <td>{numberWithCommas(cart.totalPrice)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </Grid>
      </div>
      {modalOpen && <Modal closeModal={setModalOpen} />}
      {orderModal && (
        <OrderModal closeModal={setOrderModal} orderId={orderId} />
      )}
    </Helmet>
  )
}

export default Account

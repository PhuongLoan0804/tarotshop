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
  }
  const [{ name, email }, setAccount] = useState(initialState)

  const [carts, setCart] = useState([])

  const [modalOpen, setModalOpen] = useState(false)
  const [orderModal, setOrderModal] = useState(false)

  const handleEditButton = () => setModalOpen(true)

  const handleShowOrderDetail = (e) => {
    e.preventDefault()
    setOrderModal(true)
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

        console.log(orders)
        setAccount({
          name: user.user.name,
          email: user.user.email,
        })
      } catch (error) {
        console.log(error)
        window.location.href = "/login"
      }
    }
    getUser()
  }, [name, email])

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
                    <th>Tổng tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {carts.map((cart) => {
                    return (
                      <tr key={cart._id}>
                        <td>
                          <a
                            href={`${process.env.REACT_APP_BACK_END_URL}/orders/${cart._id}`}
                            onClick={handleShowOrderDetail}
                          >
                            {cart._id.toString().substring(12, 24)}
                          </a>
                        </td>
                        <td>{new Date(cart.orderDate).toLocaleString()}</td>
                        <td>Đơn hàng này có {cart.totalProducts} sản phẩm</td>
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
      {orderModal && <OrderModal closeModal={setOrderModal} />}
    </Helmet>
  )
}

export default Account

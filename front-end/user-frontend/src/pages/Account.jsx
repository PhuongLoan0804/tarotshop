import Helmet from "../components/Helmet"
import Grid from "../components/Grid"
import Button from "../components/Button"
import Modal from "../components/Modal"

import { useState, useEffect } from "react"

import { makeGetRequest } from "../utils/makeRequest"

const Account = () => {
  const initialState = {
    name: "",
    email: "",
  }
  const [{ name, email }, setAccount] = useState(initialState)

  const [cart, setCart] = useState({
    date: "17/12/2021 9:06AM",
    product: "Đá phong thủy",
    quantily: "2",
  })

  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await makeGetRequest(
          `${process.env.REACT_APP_BACK_END_URL}/users/me`
        )
        setAccount({
          name: user.user.name,
          email: user.user.email,
        })
      } catch (error) {
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
                <Button size='sm'>Sửa</Button>
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
                    <th>Ngày đặt hàng</th>
                    <th>Tên sản phẩm</th>
                    <th>Số lượng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{cart.date}</td>
                    <td>{cart.product}</td>
                    <td>{cart.quantily}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </Grid>
      </div>
      {modalOpen && <Modal closeModal={setModalOpen} />}
    </Helmet>
  )
}

export default Account

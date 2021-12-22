import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import Helmet from "./Helmet"
import Button from "./Button"

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  })

  const onChangeInput = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const registerSubmit = async (e) => {
    e.preventDefault()
    try {
      const respone = await axios.post(
        `${process.env.REACT_APP_BACK_END_URL}/users`,
        {
          ...user,
        }
      )
      if (respone.data.isOk) {
        window.location.href = "/login"
      }
    } catch (err) {
      alert(err.response.data.msg)
    }
  }

  return (
    <Helmet title='Đăng kí'>
      <div className='login-page'>
        <form onSubmit={registerSubmit}>
          <h2>đăng ký</h2>
          <label htmlFor='username'>Họ và tên</label>
          <input
            type='text'
            name='name'
            placeholder='Họ và tên'
            required
            value={user.name}
            onChange={onChangeInput}
          />
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Email'
            required
            value={user.email}
            onChange={onChangeInput}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Password'
            required
            value={user.password}
            onChange={onChangeInput}
          />
          <label htmlFor='phone'>Phone Number</label>
          <input
            type='tel'
            name='phone'
            placeholder='Phone Number'
            required
            value={user.phone}
            onChange={onChangeInput}
          />
          <label htmlFor='address'>Address</label>
          <input
            type='text'
            name='address'
            placeholder='Email'
            required
            value={user.address}
            onChange={onChangeInput}
          />
          <div className='row'>
            <Button size='sm' type='submit'>
              đăng kí
            </Button>
            <Link className='link' to='/login'>
              Đăng nhập
            </Link>
          </div>
        </form>
      </div>
    </Helmet>
  )
}

export default Register

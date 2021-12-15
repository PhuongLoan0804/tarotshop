import React, { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import Helmet from "./Helmet"
import Button from "./Button"

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const onChangeInput = (e) => {
    const { name, value } = e.target
    setUser({ ...user, [name]: value })
  }

  const loginSubmit = async (e) => {
    e.preventDefault()
    try {
      const respone = await axios.post(
        `${process.env.REACT_APP_BACK_END_URL}/users/login`,
        {
          ...user,
        }
      )
      if (respone.data.isOk) {
        document.cookie = `userSession=${respone.data.token}`
        window.location.href = "/"
      }
    } catch (err) {
      alert(err.response.data.msg)
    }
  }
  return (
    <Helmet title='Đăng nhập'>
      <div className='login-page'>
        <form onSubmit={loginSubmit}>
          <h2>đăng nhập</h2>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            placeholder='Email'
            required
            onChange={onChangeInput}
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            placeholder='Password'
            required
            onChange={onChangeInput}
          />
          <div className='row'>
            <Button size='sm' type='submit'>
              đăng nhập
            </Button>
            <Link className='link' to='/register'>
              Đăng ký
            </Link>
          </div>
        </form>
      </div>
    </Helmet>
  )
}

export default Login

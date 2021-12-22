import {
  LocationSearching,
  MailOutline,
  PhoneAndroid,
} from "@material-ui/icons"
import { useEffect } from "react"
import { useState } from "react"
import "./user.css"
import { makeGetRequest, makePatchRequest } from "../../utils/makeRequest"

export default function User() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const [input, setInput] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const handleInput = (e) => {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = input
    alert("UPDATED !")

    setUser(
      await makePatchRequest(
        `${process.env.REACT_APP_BACK_END_URL}/users/me`,
        user
      )
    )
  }

  useEffect(() => {
    const getUser = async () => {
      const user = (
        await makeGetRequest(`${process.env.REACT_APP_BACK_END_URL}/users/me`)
      ).user

      console.log(user)
      setUser(user)
    }
    getUser()
  }, [])

  return (
    <div className='user'>
      <div className='userTitleContainer'>
        <h1 className='userTitle'>Edit User</h1>
      </div>
      <div className='userContainer'>
        <div className='userShow'>
          <div className='userShowTop'>
            <div className='userShowTopTitle'>
              <span className='userShowUsername'>{user.name}</span>
            </div>
          </div>
          <div className='userShowBottom'>
            <span className='userShowTitle'>Contact Details</span>
            <div className='userShowInfo'>
              <PhoneAndroid className='userShowIcon' />
              <span className='userShowInfoTitle'>{user.phone}</span>
            </div>
            <div className='userShowInfo'>
              <MailOutline className='userShowIcon' />
              <span className='userShowInfoTitle'>{user.email}</span>
            </div>
            <div className='userShowInfo'>
              <LocationSearching className='userShowIcon' />
              <span className='userShowInfoTitle'>{user.address}</span>
            </div>
          </div>
        </div>
        <div className='userUpdate'>
          <span className='userUpdateTitle'>Edit</span>
          <form className='userUpdateForm' onSubmit={handleSubmit}>
            <div className='userUpdateLeft'>
              <div className='userUpdateItem'>
                <label>Full Name</label>
                <input
                  type='text'
                  name='name'
                  className='userUpdateInput'
                  value={input.name}
                  onChange={handleInput}
                />
              </div>
              <div className='userUpdateItem'>
                <label>Email</label>
                <input
                  type='email'
                  name='email'
                  className='userUpdateInput'
                  value={input.email}
                  onChange={handleInput}
                />
              </div>
              <div className='userUpdateItem'>
                <label>Phone</label>
                <input
                  type='text'
                  name='phone'
                  className='userUpdateInput'
                  value={input.phone}
                  onChange={handleInput}
                />
              </div>
              <div className='userUpdateItem'>
                <label>Address</label>
                <input
                  type='text'
                  name='address'
                  className='userUpdateInput'
                  value={input.address}
                  onChange={handleInput}
                />
              </div>
            </div>
            <div className='userUpdateRight'>
              <button className='userUpdateButton' type='submit'>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

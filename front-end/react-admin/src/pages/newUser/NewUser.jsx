import "./newUser.css"
import { useState } from "react"
import { makePostRequeset } from "../../utils/makeRequest"

export default function NewUser() {
  const [input, setInput] = useState({
    name: "",
    password: "",
    address: "",
    email: "",
    phone: "",
    gender: "",
    status: "",
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    await makePostRequeset(`${process.env.REACT_APP_BACK_END_URL}/users`, input)
    alert("CREATED !")
    window.location.href = "/users"
  }

  return (
    <div className='newUser'>
      <h1 className='newUserTitle'>New User</h1>
      <form className='newUserForm' onSubmit={handleOnSubmit}>
        <div className='newUserItem'>
          <label>Name</label>
          <input
            type='text'
            value={input.name}
            placeholder='User Name'
            name='name'
            onChange={handleOnChange}
            required
          />
        </div>
        <div className='newUserItem'>
          <label>Email</label>
          <input
            type='email'
            value={input.email}
            placeholder='someone@gmail.com'
            name='email'
            onChange={handleOnChange}
            required
          />
        </div>
        <div className='newUserItem'>
          <label>Password</label>
          <input
            type='password'
            placeholder='password'
            value={input.password}
            name='password'
            onChange={handleOnChange}
            required
          />
        </div>
        <div className='newUserItem'>
          <label>Phone</label>
          <input
            type='tel'
            placeholder='+1 123 456 78'
            name='phone'
            value={input.phone}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className='newUserItem'>
          <label>Address</label>
          <input
            type='text'
            placeholder='New York | USA'
            name='address'
            value={input.address}
            onChange={handleOnChange}
            required
          />
        </div>
        <div className='newUserItem'>
          <label>Gender</label>
          <div className='newUserGender'>
            <select
              className='newUserSelect'
              name='gender'
              id='active'
              value={input.gender}
              onChange={handleOnChange}
              required
            >
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='other'>Other</option>
            </select>
          </div>
        </div>
        <div className='newUserItem'>
          <label>Active</label>
          <select
            className='newUserSelect'
            name='status'
            id='active'
            value={input.status}
            onChange={handleOnChange}
            required
          >
            <option value='active'>Yes</option>
            <option value='not active'>No</option>
          </select>
        </div>
        <button className='newUserButton' type='submit'>
          Create
        </button>
      </form>
    </div>
  )
}

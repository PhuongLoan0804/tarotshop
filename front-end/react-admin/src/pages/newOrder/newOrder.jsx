import "./newOrder.css"
import { useState } from "react"
import { makePostRequeset, makeGetRequest } from "../../utils/makeRequest"
import { useEffect } from "react"

export default function NewOrder() {
  const [input, setInput] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    status: "",
    quantity: 1,
  })

  const [products, setProducts] = useState([])
  const [usersEmail, setUsersEmail] = useState([])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    await makePostRequeset(
      `${process.env.REACT_APP_BACK_END_URL}/orders`,
      input
    )
    alert("CREATED !")
    window.location.href = "/orders"
  }

  useEffect(() => {
    const getProducts = async () => {
      const prods = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/products/all`
      )
      const usersEmail = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/users`
      )
      setProducts(prods)
      setUsersEmail(usersEmail)
    }
    getProducts()
  }, [])

  return (
    <div className='newUser'>
      <h1 className='newUserTitle'>New Order</h1>
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
          <select
            name='email'
            value={input.email}
            onChange={handleOnChange}
            className='newUserSelect'
          >
            {usersEmail.map((user) => {
              return (
                <option value={user.email} key={user._id}>
                  {user.email}
                </option>
              )
            })}
          </select>
        </div>
        <div className='newUserItem'>
          <label>Products</label>
          <div className="className='newUserGender'">
            <select
              name='categorySlug'
              //   value={products[0].title}
              onChange={handleOnChange}
              className='newUserSelect'
            >
              {products.map((product) => {
                return (
                  <option value={product.title} key={product._id}>
                    {product.title}
                  </option>
                )
              })}
            </select>
          </div>
          <div className='newUserItem'>
            <label>Quantity</label>
            <input
              type='number'
              value={input.quantity}
              placeholder='Quantity'
              name='totalProducts'
              onChange={handleOnChange}
              required
            />
          </div>
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
          <label>Status</label>
          <select
            className='newUserSelect'
            name='status'
            id='active'
            value={input.status}
            onChange={handleOnChange}
            required
          >
            <option value='PENDING'>PENDING</option>
            <option value='APPROVED'>APPROVED</option>
            <option value='DECLINED'>DECLINED</option>
          </select>
        </div>
        <button className='newUserButton' type='submit'>
          Create
        </button>
      </form>
    </div>
  )
}

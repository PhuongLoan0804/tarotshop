import { useState } from "react"
import "./NewCategory.css"
import { makePostRequeset } from "../../utils/makeRequest"

export default function NewCategory() {
  const [input, setInput] = useState({
    display: "",
    categorySlug: "",
  })

  const onChangeHandle = async (e) => {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })
  }

  const onSubmitHandle = async (e) => {
    e.preventDefault()

    console.log(input)
    await makePostRequeset(
      `${process.env.REACT_APP_BACK_END_URL}/categories`,
      input
    )

    alert("ADDED SUCCESSFULLY!")

    setInput({
      display: "",
      categorySlug: "",
    })
  }

  return (
    <div className='newProduct'>
      <h1 className='addProductTitle'>New Product</h1>
      <form className='addProductForm' onSubmit={onSubmitHandle}>
        <div className='addProductItem'>
          <label>Name</label>
          <input
            type='text'
            placeholder='Antique'
            name='display'
            onChange={onChangeHandle}
            value={input.display}
            required
          />
        </div>
        <div className='addProductItem'>
          <label>Category Slug</label>
          <input
            type='text'
            name='categorySlug'
            onChange={onChangeHandle}
            value={input.categorySlug}
            required
          />
        </div>
        <button className='addProductButton' type='submit'>
          Create
        </button>
      </form>
    </div>
  )
}

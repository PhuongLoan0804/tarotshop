import { useState } from "react"
import "./newProduct.css"
import { makePostRequeset } from "../../utils/makeRequest"
import { uploadImage } from "../../utils/imageUpload"

export default function NewProduct() {
  const [input, setInput] = useState({
    title: "",
    price: 0,
    image0: "",
    image1: "",
    categorySlug: "",
    description: "",
    numberInStock: 0,
    status: "true",
  })

  const onChangeHandle = async (e) => {
    const { name, value } = e.target
    setInput({ ...input, [name]: value })
  }

  const onChangeImage = async (e) => {
    const url = await uploadImage(e.target)
    setInput({
      ...input,
      image0: url,
    })
  }

  const onSubmitHandle = async (e) => {
    e.preventDefault()

    console.log(input)
    await makePostRequeset(
      `${process.env.REACT_APP_BACK_END_URL}/products`,
      input
    )

    alert("ADDED SUCCESSFULLY!")
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
            name='title'
            onChange={onChangeHandle}
            value={input.title}
            required
          />
        </div>
        <div className='addProductItem'>
          <label>Price</label>
          <input
            type='Number'
            name='price'
            onChange={onChangeHandle}
            value={input.price}
            required
          />
        </div>
        <div className='addProductItem'>
          <label>Image 0</label>
          <input
            type='file'
            id='file'
            name='image0'
            onChange={onChangeImage}
            required
          />
        </div>
        <div className='addProductItem'>
          <label>Number in Stock</label>
          <input
            type='number'
            name='numberInStock'
            onChange={onChangeHandle}
            value={input.numberInStock}
            required
          />
        </div>
        <div className='addProductItem'>
          <label>Category Slug</label>
          <input
            type='text'
            placeholder='Antique'
            name='categorySlug'
            onChange={onChangeHandle}
            value={input.categorySlug}
            required
          />
        </div>
        <div className='addProductItem'>
          <label>Description</label>
          <input
            type='text'
            placeholder='Antique is a...'
            name='description'
            onChange={onChangeHandle}
            required
          />
        </div>
        <div className='addProductItem'>
          <label>Active</label>
          <select name='status' id='active' onChange={onChangeHandle} required>
            <option value='true'>Yes</option>
            <option value='false'>No</option>
          </select>
        </div>
        <button className='addProductButton' type='submit'>
          Create
        </button>
      </form>
    </div>
  )
}

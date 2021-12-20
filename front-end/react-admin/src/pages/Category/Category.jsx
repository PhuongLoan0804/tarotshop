import "./Category.css"

import { useState } from "react"
import { useEffect } from "react"
import { makeGetRequest, makePatchRequest } from "../../utils/makeRequest"

export default function Product() {
  const [category, setCategory] = useState({
    display: "",
    categorySlug: "",
  })

  const [updateCategory, setUpdateCategory] = useState({})

  const url = window.location.href
  const urlSplited = url.split("/")
  const categoryId = urlSplited[urlSplited.length - 1]

  useEffect(() => {
    const getCategoryById = async () => {
      const categoryById = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/categories/${categoryId}`
      )
      setCategory(categoryById)
    }
    getCategoryById()
  }, [categoryId])

  // useEffect(() => {
  //   const getCategories = async () => {
  //     const categories = await makeGetRequest(
  //       `${process.env.REACT_APP_BACK_END_URL}/categories/all`
  //     )
  //     // setCategorySlug(categories)
  //   }
  //   getCategories()
  // }, [])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setUpdateCategory({ ...updateCategory, [name]: value })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const newCategory = await makePatchRequest(
      `${process.env.REACT_APP_BACK_END_URL}/categories/${categoryId}`,
      updateCategory
    )

    setCategory(newCategory)
    alert("UPDATED !")
  }
  return (
    <div className='product'>
      <div className='productTitleContainer'>
        <h1 className='productTitle'>Category</h1>
      </div>
      <div className='productTop'>
        <div className='productTopRight'>
          <div className='productInfoBottom'>
            <div className='productInfoItem'>
              <span className='productInfoKey'>ID: </span>
              <span className='productInfoValue'>{category._id}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Display Name:</span>
              <span className='productInfoValue'>{category.display}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Category Slug:</span>
              <span className='productInfoValue'>{category.categorySlug}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='productBottom'>
        <form className='productForm'>
          <div className='productFormLeft'>
            <label>Category Slug</label>
            <input
              type='text'
              placeholder='New Name'
              name='categorySlug'
              value={updateCategory.categorySlug}
              onChange={handleOnChange}
            />
            <label>Display Name</label>
            <input
              type='text'
              placeholder='Display Name...'
              name='display'
              value={updateCategory.display}
              onChange={handleOnChange}
            />
          </div>
          <div className='productFormRight'>
            <button className='productButton' onClick={handleUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

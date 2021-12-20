import "./product.css"
import Chart from "../../components/chart/Chart"
//product data count number of order document
import { productData } from "../../dummyData"
import { Publish } from "@material-ui/icons"
import { useState } from "react"
import { useEffect } from "react"
import { makeGetRequest, makePatchRequest } from "../../utils/makeRequest"
import { uploadImage } from "../../utils/imageUpload"

export default function Product() {
  const [product, setProduct] = useState({})
  const [updateProduct, setUpdateProduct] = useState({
    title: "",
    numberInStock: "",
    status: "true",
    price: 0,
    categorySlug: "",
    image0: "",
  })
  const [categorySlug, setCategorySlug] = useState([])

  const url = window.location.href
  const urlSplited = url.split("/")
  const productId = urlSplited[urlSplited.length - 1]

  useEffect(() => {
    const getProductById = async () => {
      const productById = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/products/${productId}`
      )
      setProduct(productById)
    }
    getProductById()
  }, [productId])

  useEffect(() => {
    const getCategories = async () => {
      const categories = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/categories/all`
      )
      setCategorySlug(categories)
    }
    getCategories()
  }, [])

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setUpdateProduct({ ...updateProduct, [name]: value })
  }

  const onChangeImage = async (e) => {
    const url = await uploadImage(e.target)
    setUpdateProduct({
      ...updateProduct,
      image0: url,
    })
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const newProduct = await makePatchRequest(
      `${process.env.REACT_APP_BACK_END_URL}/products/${productId}`,
      updateProduct
    )

    setProduct(newProduct)
    alert("UPDATED !")
  }
  return (
    <div className='product'>
      <div className='productTitleContainer'>
        <h1 className='productTitle'>Product</h1>
      </div>
      <div className='productTop'>
        <div className='productTopLeft'>
          <Chart data={productData} dataKey='Sales' title='Sales Performance' />
        </div>
        <div className='productTopRight'>
          <div className='productInfoTop'>
            <img src={product.image0} alt='' className='productInfoImg' />
            <span className='productName'>{product.title}</span>
          </div>
          <div className='productInfoBottom'>
            <div className='productInfoItem'>
              <span className='productInfoKey'>ID: </span>
              <span className='productInfoValue'>{product._id}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Sales:</span>
              <span className='productInfoValue'>{product.boughtTimes}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Active:</span>
              <span className='productInfoValue'>{product.status}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>In stock:</span>
              <span className='productInfoValue'>{product.numberInStock}</span>
            </div>
            <div className='productInfoItem'>
              <span className='productInfoKey'>Price</span>
              <span className='productInfoValue'>{product.price}</span>
            </div>
          </div>
        </div>
      </div>
      <div className='productBottom'>
        <form className='productForm'>
          <div className='productFormLeft'>
            <label>Product Name</label>
            <input
              type='text'
              placeholder='New Name'
              name='title'
              value={updateProduct.title}
              onChange={handleOnChange}
            />
            <label>In Stock</label>
            <input
              type='number'
              placeholder='Number in stock'
              name='numberInStock'
              value={updateProduct.numberInStock}
              onChange={handleOnChange}
            />
            <label>Price</label>
            <input
              type='number'
              placeholder='Price'
              name='price'
              value={updateProduct.price}
              onChange={handleOnChange}
            />
            <label>Category Slug</label>
            <select
              name='categorySlug'
              value={updateProduct.categorySlug}
              onChange={handleOnChange}
            >
              {categorySlug.map((category) => {
                return (
                  <option value={category.categorySlug} key={category._id}>
                    {category.categorySlug}
                  </option>
                )
              })}
            </select>

            <label>Active</label>
            <select
              name='status'
              id='active'
              value={updateProduct.isActive}
              onChange={handleOnChange}
            >
              <option value='true'>Active</option>
              <option value='false'>Not Active</option>
            </select>
          </div>
          <div className='productFormRight'>
            <div className='productUpload'>
              <img src={product.image0} alt='' className='productUploadImg' />
              <label htmlFor='file'>
                <Publish />
              </label>
              <input
                type='file'
                id='file'
                style={{ display: "none" }}
                onChange={onChangeImage}
              />
            </div>
            <button className='productButton' onClick={handleUpdate}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

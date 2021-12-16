import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"

import { withRouter } from "react-router"

import { useDispatch } from "react-redux"

import { addItem } from "../redux/shopping-cart/cartItemsSlide"
import { remove } from "../redux/product-modal/productModalSlice"

import numberWithCommas from "../utils/numberWithCommas"

import Button from "../components/Button"
import Alert from "./Alert"

const ProductView = (props) => {
  const dispatch = useDispatch()
  const [isAddedToCart, setIsAddedToCart] = useState(false)

  let product = props.product

  if (product === undefined)
    product = {
      title: "",
      price: "",
      image01: null,
      image02: null,
      categorySlug: "",
      slug: "",
      description: "",
    }

  const [previewImg, setPreviewImg] = useState(product.image01)

  const [quantity, setQuantity] = useState(1)

  const updateQuantity = (type) => {
    if (type === "plus") {
      setQuantity(quantity + 1)
    } else {
      setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
    }
  }

  useEffect(() => {
    setPreviewImg(product.image01)
    setQuantity(1)
  }, [product])

  const check = () => {
    return true
  }

  const addToCart = () => {
    if (check()) {
      let newItem = {
        slug: product.slug,
        price: product.price,
        quantity: quantity,
        id: product.id,
      }
      if (dispatch(addItem(newItem))) {
        setIsAddedToCart((pre) => !pre)
      } else {
        alert("Fail")
      }
    }
  }

  const goToCart = () => {
    if (check()) {
      let newItem = {
        slug: product.slug,
        price: product.price,
        quantity: quantity,
      }
      if (dispatch(addItem(newItem))) {
        dispatch(remove())
        props.history.push("/cart")
      } else {
        alert("Fail")
      }
    }
  }

  return (
    <div>
      <div className='product'>
        <div className='product__images'>
          <div className='product__images__list'>
            <div
              className='product__images__list__item'
              onClick={() => {
                setPreviewImg(product.image01)
              }}
            >
              <img src={product.image01} alt='' />
            </div>
            <div
              className='product__images__list__item'
              onClick={() => {
                setPreviewImg(product.image02)
              }}
            >
              <img src={product.image02} alt='' />
            </div>
          </div>
          <div className='product__images__main'>
            <img src={previewImg} alt='' />
          </div>
          <div className='product__description'>
            <div className='product__description__title'>Chi tiết sản phẩm</div>
            <div
              className='product__description__content'
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></div>
          </div>
        </div>
        <div className='product__info'>
          <h1 className='product__info__title'>{product.title}</h1>
          <div className='product__info__item'>
            <span className='product__info__item__price'>
              {numberWithCommas(product.price)}
            </span>
          </div>
          <div className='product__info__item'>
            <div className='product__info__item__title'>Số lượng</div>
            <div className='product__info__item__quantity'>
              <div
                className='product__info__item__quantity__btn'
                onClick={() => updateQuantity("minus")}
              >
                <i className='bx bx-minus'></i>
              </div>
              <div className='product__info__item__quantity__input'>
                {quantity}
              </div>
              <div
                className='product__info__item__quantity__btn'
                onClick={() => updateQuantity("plus")}
              >
                <i className='bx bx-plus'></i>
              </div>
            </div>
          </div>
          <div className='product__info__item'>
            <Button size='sm' onClick={() => addToCart()}>
              thêm vào giỏ
            </Button>
            <Button size='sm' onClick={() => goToCart()}>
              mua ngay
            </Button>
          </div>
          {isAddedToCart && (
            <Alert className='alert' message='Đã thêm thành công' />
          )}
        </div>
      </div>
    </div>
  )
}

ProductView.propTypes = {
  Product: PropTypes.object,
}

export default withRouter(ProductView)

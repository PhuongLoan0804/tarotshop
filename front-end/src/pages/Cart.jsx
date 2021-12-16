import React, { useEffect, useState } from "react"

import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import Helmet from "../components/Helmet"
import CartItem from "../components/CartItem"
import Button from "../components/Button"
import Alert from "../components/Alert"
import LocationForm from "../components/LocationForm"

import productData from "../assets/fake-data/products"

import numberWithCommas from "../utils/numberWithCommas"
import checkValidCookie from "../utils/checkValidCookie"
import { makePostRequeset } from "../utils/makeRequest"

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems.value)

  const [cartProducts, setCartProducts] = useState(
    productData.getCartItemsInfo(cartItems)
  )

  const [isLogged, setIsLogged] = useState(true)

  const [totalProducts, setTotalProducts] = useState(0)

  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    setCartProducts(productData.getCartItemsInfo(cartItems))
    setTotalPrice(
      cartItems.reduce(
        (total, item) => total + Number(item.quantity) * Number(item.price),
        0
      )
    )
    setTotalProducts(
      cartItems.reduce((total, item) => total + Number(item.quantity), 0)
    )
  }, [cartItems])

  const handleOrder = async () => {
    const isLogged = await checkValidCookie()
    setIsLogged(isLogged)
    makePostRequeset(`${process.env.REACT_APP_BACK_END_URL}/orders`, {
      cartItems,
      totalProducts,
      totalPrice,
    })
  }

  return (
    <Helmet title='Giỏ hàng'>
      {!isLogged && (
        <Alert className='alert' message='Xin đăng nhập trước khi mua hàng' />
      )}
      <div className='cart'>
        <div className='cart__info'>
          <div className='cart__info__txt'>
            <p>Bạn đang có {totalProducts} sản phẩm trong giỏ hàng</p>
            <div className='cart__info__txt__price'>
              <span>Thành tiền:</span>{" "}
              <span>{numberWithCommas(Number(totalPrice))}</span>
            </div>
          </div>
          <div className='cart__info__btn'>
            <Link to='/catalog'>
              <Button size='block'>Tiếp tục mua hàng</Button>
            </Link>
          </div>
        </div>
        <div className='cart__list'>
          {cartProducts.map((item, index) => (
            <CartItem item={item} key={index} />
          ))}
        </div>
      </div>
      <LocationForm />
    </Helmet>
  )
}

export default Cart

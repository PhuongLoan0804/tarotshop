import React, { useEffect, useState } from "react"

import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

import Helmet from "../components/Helmet"
import CartItem from "../components/CartItem"
import Button from "../components/Button"
import Alert from "../components/Alert"
import Grid from "../components/Grid"
import LocationForm from "../components/LocationForm"

import numberWithCommas from "../utils/numberWithCommas"
import { makeGetRequest } from "../utils/makeRequest"

const Cart = () => {
  const cartItems = useSelector((state) => state.cartItems.value)
  // console.log(cartItems)

  // const [province, setProvince] = useState({})

  const [cartProducts, setCartProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      const products = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/products/?productsId=${cartItems
          .map((item) => item.id)
          .toString()}`
      )

      setCartProducts(
        products.map((product) => {
          const match = cartItems.find((item) => item.id === product._id)
          return {
            ...product,
            quantity: match?.quantity,
            id: product._id,
          }
        })
      )
    }
    getProducts()
  }, [cartItems])

  useEffect(() => {
    // setCartProducts(productData.getCartItemsInfo(cartItems))
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

  const [isLogged, setIsLogged] = useState(true)

  const [totalProducts, setTotalProducts] = useState(0)

  const [totalPrice, setTotalPrice] = useState(0)

  return (
    <Helmet title='Giỏ hàng'>
      {!isLogged && (
        <Alert className='alert' message='Xin đăng nhập trước khi mua hàng' />
      )}
      <Grid col={2} mdCol={1} smCol={1} gap={20}>
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
            {cartProducts.map((item) => (
              <CartItem item={item} key={item._id} />
            ))}
          </div>
        </div>
        <LocationForm
          items={{ cartItems, totalProducts, totalPrice }}
          // setProvince={setProvince}
          setIsLogged={setIsLogged}
        />
      </Grid>
    </Helmet>
  )
}

export default Cart

import React, { useRef, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
// logo
import logo from "../assets/images/LonTonShop.png"
import { useState } from "react"

import checkValidCookie from "../utils/checkValidCookie"
// path menu
const mainNav = [
  {
    display: "Trang chủ",
    path: "/",
  },
  {
    display: "Sản phẩm",
    path: "/catalog",
  },
  {
    display: "Liên hệ",
    path: "/contact",
  },
]

const Header = () => {
  // menu active
  const { pathname } = useLocation()
  const activeNav = mainNav.findIndex((e) => e.path === pathname)
  const [isLogged, setIsLogged] = useState(false)

  // scroll menu
  const headerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("shrink")
      } else {
        headerRef.current.classList.remove("shrink")
      }
    }

    window.addEventListener("scroll", handleScroll)

    // check if there is valid a cookie
    const getUser = async () => {
      const isLogged = await checkValidCookie()
      setIsLogged(isLogged)
    }

    getUser()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // toggle
  const menuLeft = useRef(null)

  const menuToggle = () => menuLeft.current.classList.toggle("active")

  return (
    <div>
      <div className='header' ref={headerRef}>
        <div className='container'>
          <div className='header__logo'>
            <Link to='/'>
              <img src={logo} alt='' />
            </Link>
          </div>
          <div className='header__menu'>
            <div className='header__menu__mobile-toggle' onClick={menuToggle}>
              <i className='bx bx-menu-alt-left'></i>
            </div>
            <div className='header__menu__left' ref={menuLeft}>
              <div className='header__menu__left__close' onClick={menuToggle}>
                <i className='bx bx-chevron-left'></i>
              </div>
              {mainNav.map((item, index) => (
                <div
                  key={index}
                  className={`header__menu__item header__menu__left__item ${
                    index === activeNav ? "active" : ""
                  }`}
                  onClick={menuToggle}
                >
                  <Link to={item.path}>
                    <span>{item.display}</span>
                  </Link>
                </div>
              ))}
            </div>
            <div className='header__menu__right'>
              <div className='header__menu__item header__menu__right__item'>
                <i className='bx bx-search-alt'></i>
              </div>
              <div className='header__menu__item header__menu__right__item'>
                <Link to='/cart'>
                  <i className='bx bx-shopping-bag'></i>
                </Link>
              </div>
              <div className='header__menu__item header__menu__right__item'>
                <Link to={isLogged ? "/me" : "/login"}>
                  <i className='bx bx-user'></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header

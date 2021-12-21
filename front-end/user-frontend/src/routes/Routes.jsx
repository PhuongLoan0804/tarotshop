import React from "react"

import { Route, Switch } from "react-router-dom"

import Home from "../pages/Home"
import Catalog from "../pages/Catalog"
import Cart from "../pages/Cart"
import Product from "../pages/Product"
import Contact from "../pages/Contact"
import Account from "../pages/Account"

import Login from "../components/Login"
import Register from "../components/Register"

const Routes = () => {
  return (
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/catalog/:id' component={Product} />
      <Route path='/catalog' component={Catalog} />
      <Route path='/contact' component={Contact} />
      <Route path='/cart' component={Cart} />
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />
      <Route path='/me' component={Account} />
    </Switch>
  )
}

export default Routes

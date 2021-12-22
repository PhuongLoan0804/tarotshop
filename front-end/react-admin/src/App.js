import Sidebar from "./components/sidebar/Sidebar"
import Topbar from "./components/topbar/Topbar"
import "./App.css"
import Home from "./pages/home/Home"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import UserList from "./pages/userList/UserList"
import User from "./pages/user/User"
import NewUser from "./pages/newUser/NewUser"
import ProductList from "./pages/productList/ProductList"
import Product from "./pages/product/Product"
import NewProduct from "./pages/newProduct/NewProduct"
import NewCategory from "./pages/newCategory/NewCategory"
import CategoriesList from "./pages/CategoriesList/CategoriesList"
import Category from "./pages/Category/Category"
import OrdersList from "./pages/OrdersList/OrdersList"
import Order from "./pages/Order/Order"
import NewOrder from "./pages/newOrder/newOrder"
import Chat from "./pages/Chat/Chat"
import { Analytics } from "./components/Analytics/Analytics"
import { Sales } from "./components/Sales/Sales"

function App() {
  return (
    <Router>
      <Topbar />
      <div className='container'>
        <Sidebar />
        <Switch>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route path='/users'>
            <UserList />
          </Route>
          <Route path='/user/:userId'>
            <User />
          </Route>
          <Route path='/newUser'>
            <NewUser />
          </Route>
          <Route path='/products'>
            <ProductList />
          </Route>
          <Route path='/product/:productId'>
            <Product />
          </Route>
          <Route path='/newproduct'>
            <NewProduct />
          </Route>
          <Route path='/newcategory'>
            <NewCategory />
          </Route>
          <Route path='/categories'>
            <CategoriesList />
          </Route>
          <Route path='/category/:id'>
            <Category />
          </Route>
          <Route exact path='/orders'>
            <OrdersList />
          </Route>
          <Route exact path='/orders/:id'>
            <Order />
          </Route>
          <Route exact path='/neworder'>
            <NewOrder />
          </Route>
          <Route exact path='/chat'>
            <Chat />
          </Route>
          <Route exact path='/analytics'>
            <Analytics />
          </Route>
          <Route exact path='/sales'>
            <Sales />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App

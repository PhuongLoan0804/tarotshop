import React from "react";
import { Admin, Resource } from "react-admin";
import restProvider from "ra-data-simple-rest";

import ProductList from "./components/ProductList";
import ProductCreate from "./components/ProductCreate";
import ProductEdit from "./components/ProductEdit";

import UserList from "./components/UserList";
import UserCreate from "./components/UserCreate";
import UserEdit from "./components/UserEdit";

import CategoryList from "./components/CategoryList";
import CategoryCreate from "./components/CategoryCreate";
import CategoryEdit from "./components/CategoryEdit";

function App() {
  return (
    <Admin dataProvider={restProvider("http://localhost:3000")}>
      <Resource 
        name="products" 
        list={ProductList} 
        create={ProductCreate}
        edit={ProductEdit}
      />
      <Resource 
        name="users" 
        list={UserList} 
        create={UserCreate}
        edit={UserEdit}
      />
      <Resource 
        name="categories" 
        list={CategoryList} 
        create={CategoryCreate}
        edit={CategoryEdit}
      />
    </Admin>
  );
}

export default App;

import "./Categories.css"
import { DataGrid } from "@material-ui/data-grid"
import { DeleteOutline } from "@material-ui/icons"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { makeGetRequest, makeDeleteRequest } from "../../utils/makeRequest"

export default function ProductList() {
  const [data, setData] = useState([])

  const [isChange, setIsChange] = useState(true)

  useEffect(() => {
    setIsChange(false)
  }, [])

  useEffect(() => {
    const getAllCategories = async () => {
      const categories = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/categories/all`
      )

      setData(
        categories.map((category) => {
          return { ...category, id: category._id }
        })
      )
    }

    getAllCategories()
  }, [isChange])

  const handleDelete = async (id) => {
    await makeDeleteRequest(
      `${process.env.REACT_APP_BACK_END_URL}/categories/${id}`
    )

    const categories = await makeGetRequest(
      `${process.env.REACT_APP_BACK_END_URL}/categories/all`
    )
    setData(
      categories.map((product) => {
        return { ...product, id: product._id }
      })
    )
    alert("DELETED SUCCESSFULLY!")
  }

  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "display",
      headerName: "Display Name",
      width: 300,
      renderCell: (params) => {
        return <div className='productListItem'>{params.row.display}</div>
      },
    },
    { field: "categorySlug", headerName: "Category Slug", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/category/" + params.row._id}>
              <button className='productListEdit'>Edit</button>
            </Link>
            <DeleteOutline
              className='productListDelete'
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        )
      },
    },
  ]

  return (
    <div className='productList'>
      <Link to='/newproduct'>
        <button className='productAddButton'>Create new product</button>
      </Link>
      <Link to='/newcategory'>
        <button className='productAddButton'>Create new category</button>
      </Link>
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  )
}

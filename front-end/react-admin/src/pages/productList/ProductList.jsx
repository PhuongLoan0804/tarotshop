import "./productList.css"
import { DataGrid } from "@material-ui/data-grid"
import { DeleteOutline } from "@material-ui/icons"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { makeGetRequest, makeDeleteRequest } from "../../utils/makeRequest"

export default function ProductList() {
  const [data, setData] = useState([])

  useEffect(() => {
    const getAllProducts = async () => {
      const products = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/products/all`
      )

      setData(
        products.map((product) => {
          return { ...product, id: product._id }
        })
      )
    }

    getAllProducts()
  }, [])

  const handleDelete = async (id) => {
    await makeDeleteRequest(
      `${process.env.REACT_APP_BACK_END_URL}/products/${id}`
    )

    const products = await makeGetRequest(
      `${process.env.REACT_APP_BACK_END_URL}/products/all`
    )
    setData(
      products.map((product) => {
        return { ...product, id: product._id }
      })
    )
    alert("DELETED SUCCESSFULLY!")
  }

  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "title",
      headerName: "Product",
      width: 300,
      renderCell: (params) => {
        return (
          <div className='productListItem'>
            <img className='productListImg' src={params.row.image0} alt='' />
            {params.row.title}
          </div>
        )
      },
    },
    { field: "numberInStock", headerName: "Stocks", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
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
        <button className='productAddButton'>Create</button>
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

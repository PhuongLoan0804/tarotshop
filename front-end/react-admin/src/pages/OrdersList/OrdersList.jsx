import "./OrderList.css"
import { DataGrid } from "@material-ui/data-grid"
import { DeleteOutline } from "@material-ui/icons"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { makeGetRequest, makeDeleteRequest } from "../../utils/makeRequest"
import numberWithCommas from "../../utils/numberWithCommas"

export default function ProductList() {
  const [data, setData] = useState([])

  const [isChange, setIsChange] = useState(true)

  useEffect(() => {
    setIsChange(false)
  }, [])

  useEffect(() => {
    const getAllOrders = async () => {
      const orders = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/admin/orders`
      )
      setData(
        orders.map((order) => {
          return { ...order, id: order._id }
        })
      )
    }

    getAllOrders()
  }, [isChange])

  const handleDelete = async (id) => {
    await makeDeleteRequest(
      `${process.env.REACT_APP_BACK_END_URL}/orders/${id}`
    )
    const categories = await makeGetRequest(
      `${process.env.REACT_APP_BACK_END_URL}/orders/all`
    )
    setData(
      categories.map((product) => {
        return { ...product, id: product._id }
      })
    )
    alert("DELETED SUCCESSFULLY!")
  }

  const columns = [
    { field: "id", headerName: "ID", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        return <div className='productListItem'>{params.row.status}</div>
      },
    },
    {
      field: "userName",
      headerName: "User's Name",
      width: 170,
    },
    {
      field: "totalPrice",
      headerName: "Total Price",
      width: 150,
      renderCell: (params) => {
        return (
          <div>
            <p>{numberWithCommas(params.row.totalPrice)}</p>
          </div>
        )
      },
    },
    {
      field: "totalProducts",
      headerName: "Quantity",
      width: 130,
    },
    {
      field: "detail",
      headerName: "Address",
      width: 400,
      renderCell: (params) => {
        return (
          <div>
            <p>
              {params.row.city.label},{params.row.district.label},
              {params.row.ward.label},{params.row.detail}
            </p>
          </div>
        )
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/orders/" + params.row._id}>
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
      <Link to='/neworder'>
        <button className='productAddButton'>Create new order</button>
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

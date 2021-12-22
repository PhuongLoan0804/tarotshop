import "./userList.css"
import { DataGrid } from "@material-ui/data-grid"
import { DeleteOutline } from "@material-ui/icons"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useEffect } from "react"
import { makeGetRequest, makeDeleteRequest } from "../../utils/makeRequest"

export default function UserList() {
  const [data, setData] = useState([])
  const [isChange, setIsChange] = useState(true)

  useEffect(() => {
    setIsChange(false)
  }, [])

  useEffect(() => {
    const getUsers = async () => {
      const users = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/users`
      )
      setData(
        users.map((user) => {
          return {
            ...user,
            id: user._id,
          }
        })
      )
    }
    getUsers()
  }, [isChange])

  const handleDelete = async (id) => {
    await makeDeleteRequest(`${process.env.REACT_APP_BACK_END_URL}/users/${id}`)
    alert("DELETED !")
    setIsChange(true)
  }

  const columns = [
    { field: "_id", headerName: "ID", width: 300 },
    {
      field: "name",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return <div className='userListUser'>{params.row.name}</div>
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className='userListEdit'>Edit</button>
            </Link>
            <DeleteOutline
              className='userListDelete'
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        )
      },
    },
  ]

  return (
    <div className='userList'>
      <Link to='/newUser'>
        <button className='userAddButton'>Create</button>
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

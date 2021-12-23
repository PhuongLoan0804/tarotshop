import "./widgetSm.css"
import { Visibility } from "@material-ui/icons"
import { useState } from "react"
import { makeGetRequest } from "../../utils/makeRequest"
import { useEffect } from "react"

export default function WidgetSm() {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const getAllUsers = async () => {
      const usersFromDb = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/users`
      )
      setUsers(usersFromDb)
    }
    getAllUsers()
  }, [])

  return (
    <div className='widgetSm'>
      <span className='widgetSmTitle'>New Join Members</span>
      <ul className='widgetSmList'>
        {users.map((user) => {
          return (
            <li className='widgetSmListItem' key={user._id}>
              <div className='widgetSmUser'>
                <span className='widgetSmUsername'>{user.name}</span>
                <span className='widgetSmUserTitle'>{user.email}</span>
              </div>
              <button className='widgetSmButton'>
                <Visibility className='widgetSmIcon' />
                Display
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

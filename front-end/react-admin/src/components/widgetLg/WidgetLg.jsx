import "./widgetLg.css"
import { useState, useEffect } from "react"
import { makeGetRequest } from "../../utils/makeRequest"
import numberWithCommas from "../../utils/numberWithCommas"

export default function WidgetLg() {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const getAllOrders = async () => {
      const allOrders = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/admin/orders`
      )
      setOrders(allOrders)
    }
    getAllOrders()
  }, [])

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>
  }
  return (
    <div className='widgetLg'>
      <h3 className='widgetLgTitle'>Latest Orders</h3>
      <table className='widgetLgTable'>
        <tr className='widgetLgTr'>
          <th className='widgetLgTh'>Customer</th>
          <th className='widgetLgTh'>Date</th>
          <th className='widgetLgTh'>Amount</th>
          <th className='widgetLgTh'>Status</th>
        </tr>
        {orders.map((order) => {
          return (
            <tr className='widgetLgTr'>
              <td className='widgetLgUser'>
                <span className='widgetLgName'>{order.userName}</span>
              </td>
              <td className='widgetLgDate'>
                {new Date(order.orderDate).toLocaleString()}
              </td>
              <td className='widgetLgAmount'>
                {numberWithCommas(order.totalPrice)}
              </td>
              <td className='widgetLgStatus'>
                <Button type={order.status} />
              </td>
            </tr>
          )
        })}
      </table>
    </div>
  )
}

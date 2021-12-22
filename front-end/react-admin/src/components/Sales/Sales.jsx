import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"
import { useState } from "react"
import { useEffect } from "react"
import { makeGetRequest } from "../../utils/makeRequest"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Sales By Customer",
    },
  },
}

const labels = ["January", "February", "March", "April", "May", "June", "July"]

const datas = {
  labels,
  datasets: [
    {
      label: "Total Price",
      data: labels.map(() => 1000),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
}

export function Sales() {
  const [data, setData] = useState(datas)

  const [isChange, setIsChange] = useState(true)

  useEffect(() => {
    setIsChange(false)
  }, [])

  useEffect(() => {
    const getAllOrders = async () => {
      const orders = await makeGetRequest(
        `${process.env.REACT_APP_BACK_END_URL}/admin/orders`
      )

      const userOrder = orders.reduce((res, curr) => {
        if (!res[curr.userEmail]) {
          res[curr.userEmail] = curr.totalPrice
          return res
        } else {
          res[curr.userEmail] += curr.totalPrice
          return res
        }
      }, {})
      console.log(orders)
      console.log(userOrder)

      const labels = Object.keys(userOrder)
      const tempData = {
        labels,
        datasets: [
          {
            label: "Total Price",
            data: labels.map((label) => userOrder[label]),
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      }

      setData(tempData)
    }

    getAllOrders()
  }, [isChange])
  return <Bar options={options} data={data} />
}

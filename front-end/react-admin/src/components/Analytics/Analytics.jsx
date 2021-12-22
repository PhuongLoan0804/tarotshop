import React from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { useState } from "react"
import { useEffect } from "react"
import { makeGetRequest } from "../../utils/makeRequest"
import random_rgba from "../../utils/getRandomColor"

ChartJS.register(ArcElement, Tooltip, Legend)

export function Analytics() {
  const [data, setData] = useState({
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        //   label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  })

  useEffect(() => {
    const getAllProducts = async () => {
      const products = await makeGetRequest(`
		${process.env.REACT_APP_BACK_END_URL}/products/all
		`)
      const productsData = products.reduce(
        (pre, curr) => {
          pre.labels.push(curr.title)
          pre.datasets[0].data.push(curr.numberInStock)
          pre.datasets[0].backgroundColor.push(random_rgba(0.2))
          pre.datasets[0].borderColor.push(random_rgba(1))

          return pre
        },
        {
          labels: [],
          datasets: [
            { data: [], backgroundColor: [], borderColor: [], borderWidth: 1 },
          ],
        }
      )

      setData(productsData)
    }
    getAllProducts()
  }, [])

  return (
    <div>
      <Doughnut
        data={data}
        options={{ responsive: true, maintainAspectRatio: false }}
      />
    </div>
  )
}

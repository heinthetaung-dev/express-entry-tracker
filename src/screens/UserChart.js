import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UserChart = ({ dataUrl }) => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   fetch(dataUrl)
  //     .then((response) => response.json())
  //     .then((data) => setData(data));
  // }, [dataUrl]);

  useEffect(() => {
    const newData = [
      {name: 'Page A', value: 100},
      {name: 'Page B', value: 20},
      {name: 'Page C', value: 10}
    ]
    
    setData(newData)
  }, [])
  const chartData = { 
    labels: data.map((d) => d.name),
    datasets: [
      {
        // label: "Data 1",
        data: data.map((d) => d.value),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
      // {
      //   label: "Data 2",
      //   data: data.map((d) => d.value),
      //   backgroundColor: "rgba(255, 99, 132, 0.4)",
      //   borderColor: "rgba(255, 99, 132, 1)",
      // },
      // {
      //   label: "Data 3",
      //   data: data.map((d) => d.value),
      //   backgroundColor: "rgba(255, 205, 86, 0.4)",
      //   borderColor: "rgba(255, 205, 86, 1)",
      // },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return <Line data={chartData} options={options} />;
}

export default UserChart;

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

const UserChart = ({ data }) => {

  const [offsetCheckBox, setOffsetCheckbox] = useState(true);

  const setMinLimit = (val, min) => {
    return val < min ? 0 : val
  }

  const chartData = {
    labels: data.map((d) => d["drawDate"]),
    datasets: [
      {
        label: "491",
        data: data.map((d) => setMinLimit(d["from_491"] - (offsetCheckBox ? parseInt(d["drawSize"]) : 0), 0)),
        backgroundColor: "rgba(80, 84, 88, 0.4)",
        borderColor: "rgba(80, 84, 88, 1)",
        yAxisID: "y1",
      },
      {
        label: "481",
        data: data.map((d) => setMinLimit(d["from_481"] - (offsetCheckBox ? parseInt(d["drawSize"]) : 0), 0)),
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        borderColor: "rgba(255, 99, 132, 1)",
        yAxisID: "y1",
      },
      {
        label: "471",
        data: data.map((d) => setMinLimit(d["from_471"] - (offsetCheckBox ? parseInt(d["drawSize"]) : 0), 0)),
        backgroundColor: "rgba(255, 205, 86, 0.4)",
        borderColor: "rgba(255, 205, 86, 1)",
        yAxisID: "y1",
      },
      {
        label: "cut-off",
        data: data.map((d) => d["cutOff"]),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        yAxisID: "y2",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    legend: {
      display: true,
      position: "bottom",
      onClick: (e, legendItem) => {
        const index = legendItem.datasetIndex;
        const ci = e.view.myLine;
        const meta = ci.getDatasetMeta(index);
        meta.hidden =
          meta.hidden === null ? !ci.data.datasets[index].hidden : null;
        ci.update();
      },
    },
    scales: {
      y1: {
        position: "left",
        id: "left-y-axis",
        scaleLabel: {
          display: true,
          labelString: "Left Axis",
          fontColor: "rgba(255, 99, 132, 1)",
        },
        ticks: {
          beginAtZero: true,
        },
      },
      y2: {
        position: "right",
        id: "right-y-axis",
        scaleLabel: {
          display: true,
          labelString: "Right Axis",
          fontColor: "rgba(75,192,192,1)",
        },
        ticks: {
          beginAtZero: true,
        },
        gridLines: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const handleCheckboxChange = (event) => {
    console.log(event.target.checked)
    setOffsetCheckbox(event.target.checked);
  };

  return (
    <>
      <Line data={chartData} options={options} />
      <label>
        <input
          type="checkbox"
          checked={offsetCheckBox}
          onChange={handleCheckboxChange}
        />
        After Draw
      </label>
    </>
  );
};

export default UserChart;

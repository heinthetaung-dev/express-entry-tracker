import logo from "./logo.svg";
import "./App.css";
import "./assets/style.css"
import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "./screens/UserChart";

function App() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    // console.log(process.env.REACT_APP_DATA)
    const noRoundsToDisplay = 30;
    const response = await axios.get(process.env.REACT_APP_DATA);
    if (response.status === 200) {
      const rounds = response.data["rounds"];
      console.log(rounds)
      const lastRoundNumber = parseInt(rounds[0]["drawNumber"]);
      const latestRounds = rounds.filter(
        (round) =>
          parseInt(round["drawNumber"]) > lastRoundNumber - noRoundsToDisplay
      );
      console.log(latestRounds);

      const newData = latestRounds
        .map((round) => {
          const from_491 =
            parseInt(round["dd1"].replaceAll(",", "")) +
            parseInt(round["dd2"].replaceAll(",", "")) +
            parseInt(round["dd4"].replaceAll(",", ""));
          const from_481 =
            from_491 + parseInt(round["dd5"].replaceAll(",", ""));
          const from_471 =
            from_481 + parseInt(round["dd6"].replaceAll(",", ""));

          return {
            drawNumber: round["drawNumber"],
            drawDate: round["drawDate"],
            cutOff: round["drawCRS"],
            from_491: from_491,
            from_481: from_481,
            from_471: from_471,
          };
        })
        .sort((a, b) => {
          console.log(parseInt(a["drawNumber"]) - parseInt(b["drawNumber"]));
          return parseInt(a["drawNumber"]) - parseInt(b["drawNumber"]);
        });
      console.log(newData);
      setData(newData);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="chart-container">
        <div className="chart">
          <Chart data={data} />
        </div>
        
        
      </div>
    </div>

  );
}

export default App;

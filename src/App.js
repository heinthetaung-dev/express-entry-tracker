import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect } from 'react';
import Chart from './screens/UserChart';

function App() {

  const fetchData = async () => {
    console.log(process.env.REACT_APP_DATA)
    const response = await axios.get(process.env.REACT_APP_DATA)
    console.log(response.data)
  }

  useEffect(() => {
    fetchData()
  })
  return (
    <div className="App">
      <Chart />
    </div>
  );
}

export default App;

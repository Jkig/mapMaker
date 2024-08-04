import { useState, useEffect } from 'react'
import './App.css'
// import Plotly from 'plotly';
import Plot from 'react-plotly.js';
//import Papa from 'papaparse';
import popData from './popData.json'


function App() {

  const [plotData, setPlotData] = useState([]);
  const [layout, setLayout] = useState({});

  useEffect(() => {
    let cleanerData = {
      code: [],
      pop: []
    }
    for (let i = 0; i < 265; i++) {
      if (popData[2 + i]['null'][64] < 1500000000) {
        cleanerData.code.push(popData[2 + i]['World Development Indicators'])
        cleanerData.pop.push(popData[2 + i]['null'][64])
      }
    }

    const data = [{
      type: 'choropleth',
      locations: cleanerData.code,
      z: cleanerData.pop,
      colorscale: 'Viridis',
      autocolorscale: false,
      marker: {
        line: {
          color: 'rgb(255, 255, 255)',
          width: 1
        }
      },
      colorbar: {
        title: 'Population'
      }
    }];

    const layout = {
      geo: {
        scope: 'world'
      }
    };

    setPlotData(data);
    setLayout(layout);
  }, []);

  return (
    <>
      Hello world
      <Plot
        data={plotData}
        layout={layout}
        style={{ width: "100%", height: "100%" }}
      />
      <p>display the different color pallets and let user choose</p>
      <p>year slider for which year, rerender when it updates</p>
      <p>select area</p>
      <p>choose dataset, perhaps usa only</p>
    </>
  )
}

export default App

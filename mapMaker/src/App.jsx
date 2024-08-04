import { useState, useEffect } from 'react'
import './App.css'
// import Plotly from 'plotly';
import Plot from 'react-plotly.js';
//import Papa from 'papaparse';
import popData from './popData.json'
import ColorSelect from './selectColor';
import ColorOptions from "./ColorOptions.jsx"



function App() {
  const [plotData, setPlotData] = useState([]);
  const [plotCol, setPlotCol] = useState(0);
  const [year, setYear] = useState(2023);
  const [layout, setLayout] = useState({});
  // todo: have a selecter for square root


  useEffect(() => {
    let cleanerData = {
      code: [],
      pop: []
    }
    for (let i = 0; i < 265; i++) {
      if (popData[2 + i]['null'][year-1960] < 1500000000) {
        cleanerData.code.push(popData[2 + i]['World Development Indicators'])
        cleanerData.pop.push(Math.sqrt(popData[2 + i]['null'][year-1960]))
      }
    }
    // for constant color scale, just add a max number:

    cleanerData.code.push("ZZZ")
    cleanerData.pop.push(Math.sqrt(1500000000))

    let data = [{
      type: 'choropleth',
      locations: cleanerData.code,
      z: cleanerData.pop,
      colorscale: ColorOptions[plotCol],
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
    console.log("Updated", plotCol, data[0].colorscale)
  }, [year, plotCol]);


  const handleChangeYear = e => {
    setYear(parseInt(e.target.value))
  };

  return (
    <>
      <div className='plotWrapper'>
        <Plot
          data={plotData}
          layout={layout}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <p>year slider for which year, rerender when it updates</p>
      <div className="slidecontainer">
        <input type="range" min="1961" max="2023" className="slider" id="myRange" onChange={handleChangeYear}/>
      </div>

      <ColorSelect setPlotCol={setPlotCol}/>
      <p>choose dataset, first is us dataset, and later </p>
      <p>the range is a bit broad, I think I'll use the log for colors, but display the true values??</p>

    </>
  )
}

export default App

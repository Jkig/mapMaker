import { useState, useEffect } from 'react'
import './App.css'
// import Plotly from 'plotly';
import Plot from 'react-plotly.js';
//import Papa from 'papaparse';
import popData from './popData.json'
import ColorSelect from './selectColor';
import ColorOptions from "./ColorOptions.jsx"
import fertlity from './fertility.json'
import landArea from './landArea.json'



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
    /*
    for (let i = 0; i < 265; i++) {
      if (popData[2 + i]['null'][year-1960] < 1500000000) {
        cleanerData.code.push(popData[2 + i]['World Development Indicators'])
        cleanerData.pop.push(Math.sqrt(popData[2 + i]['null'][year-1960]))
      }
    }
    // for constant color scale, just add a max number:

    cleanerData.code.push("ZZZ")
    cleanerData.pop.push(Math.sqrt(1500000000))
    */

    /*
    // in the real code obv. move this to something else
    // for now just show 1960-2023
    let keys = Object.keys(fertlity);
    for (let i=0;i<keys.length;i++) {
      cleanerData.code.push(keys[i])
      // 1950 is zero index
      // raw
      // cleanerData.pop.push(parseFloat(fertlity[keys[i]][year-1950][1]))
      // this is the difference from the ideal
      // I need to map this to something where birthrate of 0 is as far as birthrate of 10, so maybe 6 is as far from ideal as 1
      // for now using a simple version where its 
      if (parseFloat(fertlity[keys[i]][year-1950][1]) > 2.2){
        cleanerData.pop.push(parseFloat(fertlity[keys[i]][year-1950][1]- 2.2))// how much is it over by
      }
      else if (parseFloat(fertlity[keys[i]][year-1950][1]) < 2.0) {
        cleanerData.pop.push((2 - parseFloat(fertlity[keys[i]][year-1950][1]))*6) // how much is it under by
      }
      else {
        cleanerData.pop.push(0)// no difference from "ideal"
      }
    }
    */
    // have data from 1960-2021
    for (let i = 0; i < 265; i++) {
      if ((popData[2 + i]['null'][year-1960]/landArea[2 + i]['null'][year-1960]) < 1200) {// max allowed is about bangladesh
        cleanerData.code.push(popData[2 + i]['World Development Indicators'])
        cleanerData.pop.push(Math.pow(popData[2 + i]['null'][year-1960]/landArea[2 + i]['null'][year-1960], 1/3))
      }
    }
    // for constant color scale, just add a max number:

    cleanerData.code.push("ZZZ")
    cleanerData.pop.push(Math.pow(1200, 1/3))


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
    // console.log(cleanerData)
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
          className='myPlot'
        />
      </div>
      <p>{year}</p>
      <div className="slidecontainer">
        <input type="range" min="1961" max="2023" className="slider" id="myRange" onChange={handleChangeYear}/>
      </div>

      <ColorSelect setPlotCol={setPlotCol}/>
      <p>choose dataset, first is us dataset, and later </p>
      <p>For things like fertility, let them specify target range and then distance from it. Example here is for distance from 2.1, too high or low has challanges</p>
      <p>We can do some interesting things like total births per country</p>
      <p>GDP per capita, pop density, etc all interesting ideas</p>

    </>
  )
}

export default App

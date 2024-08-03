import { useState, useEffect } from 'react'
import './App.css'
import Plotly from 'plotly';
//import Papa from 'papaparse';
import popData from './popData.json'


function App() {

  useEffect(() => {
    // console.log(popData);
    let cleanerData = {
      code: [],
      pop: []
    }
    for (let i=0; i<265;i++){
      cleanerData.code.push(popData[2+i]['World Development Indicators'])
      cleanerData.pop.push(popData[2+i]['null'][64])
    }
    // console.log(cleanerData)

    const plotData = [{
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

    // Define the layout
    const layout = {
      geo: {
        scope: 'world'
      }
    };
    // Create the plot
    Plotly.newPlot('mapDiv', plotData, layout);
  }, []);


  return (
    <>
      Hello world
      <div id='mapDiv'></div>
    </>
  )
}

export default App

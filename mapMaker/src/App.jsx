import { useState, useEffect } from 'react'
import './App.css'
// import Plotly from 'plotly';
import Plot from 'react-plotly.js';
//import Papa from 'papaparse';
import popData from './popData.json'
import ColorSelect from './selectColor';
import ColorOptions from "./ColorOptions.jsx"
import fertlity from './fertility.json'




// let fertilityCodes = ['AFG', 'ALB', 'DZA', 'ASM', 'AND', 'AGO', 'AIA', 'ATG', 'ARG', 'ARM', 'ABW', 'AUS', 'AUT', 'AZE', 'BHS', 'BHR', 'BGD', 'BRB', 'BLR', 'BEL', 'BLZ', 'BEN', 'BMU', 'BTN', 'BOL', 'BES', 'BIH', 'BWA', 'BRA', 'VGB', 'BRN', 'BGR', 'BFA', 'BDI', 'KHM', 'CMR', 'CAN', 'CPV', 'CYM', 'CAF', 'TCD', 'CHL', 'CHN', 'COL', 'COM', 'COG', 'COK', 'CRI', 'CIV', 'HRV', 'CUB', 'CUW', 'CYP', 'CZE', 'COD', 'DNK', 'DJI', 'DMA', 'DOM', 'TLS', 'ECU', 'EGY', 'SLV', 'GNQ', 'ERI', 'EST', 'SWZ', 'ETH', 'FLK', 'FRO', 'FJI', 'FIN', 'FRA', 'GUF', 'PYF', 'GAB', 'GMB', 'GEO', 'DEU', 'GHA', 'GIB', 'GRC', 'GRL', 'GRD', 'GLP', 'GUM', 'GTM', 'GGY', 'GIN', 'GNB', 'GUY', 'HTI', 'HND', 'HKG', 'HUN', 'ISL', 'IND', 'IDN', 'IRN', 'IRQ', 'IRL', 'IMN', 'ISR', 'ITA', 'JAM', 'JPN', 'JEY', 'JOR', 'KAZ', 'KEN', 'KIR', 'OWID_KOS', 'KWT', 'KGZ', 'LAO', 'LVA', 'LBN', 'LSO', 'LBR', 'LBY', 'LIE', 'LTU', 'LUX', 'MAC', 'MDG', 'MWI', 'MYS', 'MDV', 'MLI', 'MLT', 'MHL', 'MTQ', 'MRT', 'MUS', 'MYT', 'MEX', 'FSM', 'MDA', 'MCO', 'MNG', 'MNE', 'MSR', 'MAR', 'MOZ', 'MMR', 'NAM', 'NRU', 'NPL', 'NLD', 'NCL', 'NZL', 'NIC', 'NER', 'NGA', 'NIU', 'PRK', 'MKD', 'MNP', 'NOR', 'OMN', 'PAK', 'PLW', 'PSE', 'PAN', 'PNG', 'PRY', 'PER', 'PHL', 'POL', 'PRT', 'PRI', 'QAT', 'REU', 'ROU', 'RUS', 'RWA', 'BLM', 'SHN', 'KNA', 'LCA', 'MAF', 'SPM', 'VCT', 'WSM', 'SMR', 'STP', 'SAU', 'SEN', 'SRB', 'SYC', 'SLE', 'SGP', 'SXM', 'SVK', 'SVN', 'SLB', 'SOM', 'ZAF', 'KOR', 'SSD', 'ESP', 'LKA', 'SDN', 'SUR', 'SWE', 'CHE', 'SYR', 'TWN', 'TJK', 'TZA', 'THA', 'TGO', 'TKL', 'TON', 'TTO', 'TUN', 'TUR', 'TKM', 'TCA', 'TUV', 'UGA', 'UKR', 'ARE', 'GBR', 'USA', 'VIR', 'URY', 'UZB', 'VUT', 'VAT', 'VEN', 'VNM', 'WLF', 'ESH', 'OWID_WRL', 'YEM', 'ZMB', 'ZWE']



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

import ColorOptions from "./ColorOptions.jsx"


function ColorSelect(props) {
    // pass in a function to update the color scheme


    const HandleChangeColor = (event) => {
        props.setPlotCol(parseInt(event.target.value));
      };

    return (
    <select onChange={HandleChangeColor}>
        {ColorOptions.map((option, index) => (
          <option key={index} value={index}>
            {option}
          </option>
        ))}
    </select>
    )
}


export default ColorSelect